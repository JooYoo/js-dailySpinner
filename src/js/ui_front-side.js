import * as uiUtility from './ui_utility.js';
import * as uiProgressRing from './ui_progress-ring.js';
import * as uiSwipe from './ui_swipe.js';

/* -------------------------------------------------------------------------- */
/*                            create front side UI                            */
/* -------------------------------------------------------------------------- */
function renderFrontSide(peopleContainerEl, mainStyle, allPeople) {
  let selectedPersons;

  selectedPersons = getSelectedPersons(allPeople);

  peopleContainerEl.innerHTML = '';
  setPeoplePosition(selectedPersons);
  setPeopleReverse(mainStyle, selectedPersons);

  peopleContainerEl.innerHTML = selectedPersons
    .map(
      (person) =>
        `
            <div class="people people--${person.id}"></div>
        `
    )
    .join('');
}

/* -------------------------------- create front side UI: help func ------------------------------- */

//FIXME: change a place to store: people.js
function getSelectedPersons(allPeople) {
  return allPeople.filter((person) => person.isAttend == true);
}

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
  
          .people--${person.id}::before {
            content: "${person.name}";
            position: absolute;
            transform: translateX(-50%) rotate(180deg);
          }
          `;
      } else {
        return `
          .people--${person.id} {
            --person-position: ${person.rotateDeg}deg;
          }
  
          .people--${person.id}::before {
            content: "${person.name}";
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
    console.log('DONE 🍻');
  } else {
    // DT: get random Person
    randomPerson = getRandomPerson(currentPeople);

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

/* ------------------------- turn needle: help func ------------------------- */

function getRandomPerson(allPersons) {
  let randomNr = Math.floor(Math.random() * allPersons.length);
  return allPersons[randomNr];
}

function removeRandomPerson(currentPeople, randomPerson) {
  return currentPeople.filter((x) => x !== randomPerson);
}

export { renderFrontSide, playSpinner, getSelectedPersons };
