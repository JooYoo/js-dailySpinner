import * as uiUtility from './ui_utility.js';
import * as uiProgressRing from './ui_progress-ring.js';
import * as uiSwipe from './ui_swipe.js';
import * as dataPeople from './data_people.js';

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
  let randomPerson;
  let restPeople;

  // check if finish
  if (currentPeople.length === 0) {
    // reset UI and DATA
    restPeople = uiSwipe.resetAll(swipeEl, needleEl, allPeople);

    // rest selectedPersonAnim
    resetSelectedPersonUI();

    console.log('DONE 🍻');
  } else {
    // DT: get random Person
    randomPerson = getRandomPerson(currentPeople);

    // UI:  after the person is selected, render it selected-effects
    setSelectedPersonUI(randomPerson);

    // DT: remove the pick random person
    restPeople = removeRandomPerson(currentPeople, randomPerson);

    // UI: turn the needle
    uiUtility.setCssVar('--rotate-to', `${randomPerson.rotateDeg}deg`);
    needleEl.classList.remove('turn--reset');
    needleEl.classList.add('turn--start');
  }

  // UI: set progressRing
  uiProgressRing.setProgress(restPeople, allPeople);

  // UI:  restart animation: by DOM reflow
  needleEl.style.animation = 'none';
  needleEl.offsetHeight;
  needleEl.style.animation = null;

  return restPeople;
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

/* ------------------------- turn needle: help func ------------------------- */

function getRandomPerson(allPersons) {
  let randomNr = Math.floor(Math.random() * allPersons.length);
  return allPersons[randomNr];
}

function removeRandomPerson(currentPeople, randomPerson) {
  return currentPeople.filter((x) => x !== randomPerson);
}

export { renderFrontSide, playSpinner, resetSelectedPersonUI };
