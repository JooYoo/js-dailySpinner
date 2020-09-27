import * as uiUtility from './ui_utility.js';
import * as uiProgressRing from './ui_progress-ring.js';
import * as uiSwipe from './ui_swipe.js';
import * as dataPeople from './data_people.js';
import * as timer from './timer.js';

/* -------------------------------------------------------------------------- */
/*                            create front side UI                            */
/* -------------------------------------------------------------------------- */
function renderFrontSide(peopleContainerEl, mainStyle, allPeople) {
  let selectedPeople;

  selectedPeople = dataPeople.getSelectedPeople(allPeople);

  peopleContainerEl.innerHTML = '';
  setPeoplePosition(selectedPeople);
  peopleContainerEl.innerHTML = selectedPeople
    .map(
      (person) =>
        `
        <div>
          <div class="people people--${person.id}">
            <div class="fave-effect">
              ${person.name}
            </div>
          </div>
        </div>
        `
    )
    .join('');
  setPeopleReverse(mainStyle, selectedPeople);
}

/* -------------------------------- create front side UI: help func ------------------------------- */

function setPeoplePosition(selectedPeople) {
  for (let i = 0; i < selectedPeople.length; i++) {
    selectedPeople[i].rotateDeg = (360 / selectedPeople.length) * i;
  }
}

function setPeopleReverse(mainStyle, selectedPeople) {
  mainStyle.innerHTML = selectedPeople
    .map((person) => {
      if (person.rotateDeg > 90 && person.rotateDeg < 270) {
        return `
          .people--${person.id} {
            --person-position: ${person.rotateDeg}deg;
          }

          .people--${person.id} .fave-effect {
            transform: translateX(-50%) translateY(-50%) rotate(180deg);
          }
          `;
      } else {
        return `
          .people--${person.id} {
            --person-position: ${person.rotateDeg}deg;
          }

          .people--${person.id} .fave-effect {
            transform: translateX(-50%) translateY(-50%);
          }
          `;
      }
    })
    .join('');
  document.head.appendChild(mainStyle);
}

/* -------------------------------------------------------------------------- */
/*                                 turn needle                                */
/* -------------------------------------------------------------------------- */

function playSpinner(swipeEl, needleEl, allPeople, currentPeople) {
  let restPeople;
  let randomPerson;
  let currentPeopleLength = currentPeople.length;
  let selectPeopleLength = dataPeople.getSelectedPeople(allPeople).length;

  // UI: veryBegin ? reset randomPerson
  currentPeopleLength === selectPeopleLength ? (randomPerson = '') : '';

  // check if finish
  if (currentPeople.length === 0) {
    // reset UI and DATA
    restPeople = uiSwipe.resetAll(swipeEl, needleEl, allPeople);

    console.log('DONE 🍻');
  } else {
    // DT: get RandomPerson
    randomPerson = getRandomPerson(currentPeople);

    // DT: remove picked RandomPerson
    restPeople = removeRandomPerson(currentPeople, randomPerson);

    // UI: selectedPersonEffect Anim
    setSelectedPersonUI(randomPerson);

    // UI: turn the needle
    uiUtility.setCssVar('--rotate-to', `${randomPerson.rotateDeg}deg`);
    needleEl.classList.remove('turn--reset');
    needleEl.classList.add('turn--start');
  }

  // UI: set var(--rotate-from)
  setRotateFromUI(needleEl, randomPerson);

  // UI: set progressRing
  uiProgressRing.setProgress(restPeople, allPeople);

  // UI: restart animation: by DOM reflow
  needleEl.style.animation = 'none';
  needleEl.offsetHeight;
  needleEl.style.animation = null;

  // MainTimer
  timer.setMainTimer(restPeople, allPeople);

  // PersonTimer
  timer.setPersonTimer(restPeople, allPeople);

  return restPeople;
}

/* ------------------------- turn needle: help func ------------------------- */

function setRotateFromUI(needleEl, randomPerson) {
  // justBeginn ? continueSpin : firstSpin
  needleEl.addEventListener('animationend', () => {
    randomPerson
      ? uiUtility.setCssVar('--rotate-from', `${randomPerson.rotateDeg}deg`)
      : uiUtility.setCssVar('--rotate-from', '0deg');
  });
}

function setSelectedPersonUI(randomPerson) {
  // get the selectedPersonFaveEl
  let selectedPersonFaveEl = document.querySelector(
    `.people--${randomPerson.id}`
  ).children[0];

  // play FaveAnim
  selectedPersonFaveEl.classList.add('start-selected-effect');
}

function resetSelectedPersonUI() {
  // get all PersonEl which already shows the faveAnim
  let allSelectedPerson = document.querySelectorAll('.fave-effect');

  // - rest all the FaveAnim
  // - rest Person color
  allSelectedPerson.forEach((selectedPersonEl) => {
    selectedPersonEl.classList.remove('start-selected-effect');
  });
}

function getRandomPerson(allPersons) {
  let randomNr = Math.floor(Math.random() * allPersons.length);
  return allPersons[randomNr];
}

function removeRandomPerson(currentPeople, randomPerson) {
  return currentPeople.filter((x) => x !== randomPerson);
}

export { renderFrontSide, playSpinner, resetSelectedPersonUI };
