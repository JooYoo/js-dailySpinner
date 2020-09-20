import * as uiSwipe from './ui_swipe.js';
import * as uiFrontSide from './ui_front-side.js';
import * as uiBackSide from './ui_back-side.js';
import * as uiShortcut from './ui_shortcut.js';
import * as dataLocalStorage from './data_localstorage.js';
import * as dataPeople from './data_people.js';

import '../components/yu-toast.js';
import '../components/yu-progress-ring.js';

// get UI elements
const needleEl = document.querySelector('#spin-needle');
const btnTurnEl = document.querySelector('#btn-turn');
const swipeEl = document.querySelector('#spin-container');
const frontSidePeopleEl = document.querySelector('#people-container');
const mainStyle = document.createElement('style');
const backSidePeopleEl = document.querySelector('#people-list');
const backSidePeopleFormEl = document.querySelector('#people-list__form');
const inputEl = backSidePeopleFormEl['new-name'];

// create Person-Object
let persons = [];
let currentPersons = [];

// validate if localStorage has data, otherwise push default people
let preloadPeople = dataLocalStorage.loadPeople();
if (preloadPeople) {
  persons = dataLocalStorage.loadPeople();
} else {
  persons = dataPeople.initPeople(persons);
}

// inBeginning:
currentPersons = dataPeople.getSelectedPeople(persons);

/* -------------------------------------------------------------------------- */
/*                               Service Worker                               */
/* -------------------------------------------------------------------------- */

registerSW();

async function registerSW() {
  if ('serviceWorker' in navigator) {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
      } catch (e) {
        console.log(`SW registration failed`);
      }
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                     UI_SWIPE: flip + reset                                 */
/* -------------------------------------------------------------------------- */

window.onload = () => {
  /* ---------------------------------- start --------------------------------- */
  swipeEl.addEventListener('mousedown', (e) => {
    uiSwipe.onSwipeMouseDonw(10);
  });
  swipeEl.addEventListener('touchstart', (e) => {
    uiSwipe.onSwipeTouchStart(0.2);
  });

  /* ----------------------------------- on ----------------------------------- */
  window.addEventListener('mousemove', (e) => {
    let restPeople = uiSwipe.onSwipeTo(
      e,
      swipeEl,
      needleEl,
      frontSidePeopleEl,
      mainStyle,
      persons
    );
    if (restPeople) currentPersons = restPeople;
  });
  swipeEl.addEventListener('touchmove', (e) => {
    let restPeople = uiSwipe.onSwipeTo(
      e,
      swipeEl,
      needleEl,
      frontSidePeopleEl,
      mainStyle,
      persons
    );
    if (restPeople) currentPersons = restPeople;
  });

  /* ----------------------------------- end ---------------------------------- */
  window.addEventListener('mouseup', () => {
    uiSwipe.onSwipeMouseUp();
  });
  window.addEventListener('touchend', () => {
    uiSwipe.onSwipeTouchEnd();
  });

  /* -------------------------------------------------------------------------- */
  /*                                 side__front                                */
  /* -------------------------------------------------------------------------- */

  // render FrontSide
  uiFrontSide.renderFrontSide(frontSidePeopleEl, mainStyle, persons);

  // click to get randomPerson no repeat
  btnTurnEl.addEventListener('click', () => {
    currentPersons = uiFrontSide.playSpinner(
      swipeEl,
      needleEl,
      persons,
      currentPersons
    );
  });

  /* -------------------------------------------------------------------------- */
  /*                                 side__back                                 */
  /* -------------------------------------------------------------------------- */

  //render Backside People list
  uiBackSide.renderBackSide(backSidePeopleEl, persons);

  /* ----------------------------- add new person ----------------------------- */

  // press Enter: ad new person
  backSidePeopleFormEl.addEventListener('keydown', (e) => {
    // Textbox content
    let inputVal = inputEl.value;

    // press Enter: valid text
    if (e.keyCode === 13 && inputVal) {
      e.preventDefault();

      // add new person DT + UI
      uiBackSide.addPerson(
        frontSidePeopleEl,
        backSidePeopleEl,
        backSidePeopleFormEl,
        mainStyle,
        inputVal,
        persons
      );

      // press Enter: invalid text
    } else if (e.keyCode === 13 && !inputVal) {
      e.preventDefault();
    }
  });

  /* ---------------------------- set attend person --------------------------- */

  backSidePeopleEl.addEventListener('click', (e) => {
    let attendPeople = uiBackSide.setAttendPerson(e, persons);
    if (attendPeople) persons = attendPeople;
  });

  /* ------------------------------ remove person ----------------------------- */

  backSidePeopleEl.addEventListener('click', (e) => {
    // UI: only works when click on 'X'
    if (e.target.className !== 'people-list-item__delete-btn') return;

    persons = uiBackSide.removePerson(
      frontSidePeopleEl,
      backSidePeopleEl,
      mainStyle,
      e,
      persons
    );
  });

  /* -------------------------------------------------------------------------- */
  /*                               shortcuts                                    */
  /* -------------------------------------------------------------------------- */
  // press 'R' to reset
  window.addEventListener('keydown', (e) => {
    let currentPeople = uiShortcut.kbRest(swipeEl, needleEl, e, persons);
    if (currentPeople) currentPersons = currentPeople;
  });

  // // press 'Enter' to start spin
  window.addEventListener('keydown', (e) => {
    let currentPeople = uiShortcut.kbStart(
      swipeEl,
      needleEl,
      e,
      persons,
      currentPersons
    );
    if (currentPeople) currentPersons = currentPeople;
  });

  // // press 'F' to flip
  window.addEventListener('keydown', (e) => {
    let currentPeople = uiShortcut.kbFlip(
      swipeEl,
      needleEl,
      inputEl,
      frontSidePeopleEl,
      e,
      mainStyle,
      persons
    );
    if (currentPeople) currentPersons = currentPeople;
  });
};
