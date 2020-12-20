import * as uiSwipe from './ui_swipe.js';
import * as uiFrontSide from './ui_front-side.js';
import * as uiBackSide from './ui_back-side.js';
import * as uiShortcut from './ui_shortcut.js';
import * as uiSlideupPanel from './ui_slideUpPanel.js';
import * as dataPeople from './data_people.js';
import * as timer from './timer.js';
import * as popup from './popup.js';

import '../components/yu-toast.js';
import '../components/yu-progress-ring.js';
import '../components/yu-settings-card-timer.js';

// get UI elements
const needleEl = document.querySelector('#spin-needle');
const btnTurnEl = document.querySelector('#btn-turn');
const swipeEl = document.querySelector('#spin-container');
const frontSidePeopleEl = document.querySelector('#people-container');
const mainStyle = document.createElement('style');
const backSidePeopleEl = document.querySelector('#people-list');
const backSidePeopleFormEl = document.querySelector('#people-list__form');
const inputEl = backSidePeopleFormEl['new-name'];
const modalBgEl = document.querySelector('#modal__bg');
const slideUpPanelEl = document.querySelector('#slide-up-panel__container');
const btnSlideUpEl = document.querySelector('#slide-up-panel__btn');
const btnFlipEl = document.querySelector('#btn-flip');

// create Person-Object
let persons = [];
let currentPersons = [];

// validate if localStorage has data, otherwise push default people
persons = dataPeople.getSavedPeople();

// inBeginning:
currentPersons = dataPeople.getSelectedPeople(persons);

// slide up
let isUp = false;

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
/*                               Hammerjs: swipe                              */
/* -------------------------------------------------------------------------- */
const hammertimer = new Hammer(swipeEl);

hammertimer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertimer.on('pan', (ev) => {
  // which interaction happens
  switch (ev.additionalEvent) {
    // swipe => Back
    case 'panright':
      uiSwipe.flipToBackAnim(swipeEl);
      break;

    // swipe <= Front
    case 'panleft':
      currentPersons = uiSwipe.flipToFront(
        swipeEl,
        needleEl,
        frontSidePeopleEl,
        mainStyle,
        persons,
      );
      break;

    // swipe UP
    case 'panup':
      if (!uiSwipe.isBack(swipeEl)) {
        currentPersons = uiSwipe.resetAll(swipeEl, needleEl, persons);
      }
      break;

    default:
      break;
  }
});

window.onload = () => {
  /* -------------------------------------------------------------------------- */
  /*                           Shakejs: phone shaking                           */
  /* -------------------------------------------------------------------------- */
  var myShakeEvent = new Shake({
    threshold: 15,
    timeout: 1000,
  });

  myShakeEvent.start();

  window.addEventListener('shake', () => {
    // reset spinner after shake
    currentPersons = uiSwipe.resetAll(swipeEl, needleEl, persons);
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
      currentPersons,
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
        persons,
      );

      // update mainTimer
      timer.setIndiTimerMainTimerUpdatePeople(persons);

      // press Enter: invalid text
    } else if (e.keyCode === 13 && !inputVal) {
      e.preventDefault();
    }
  });

  /* ---------------------------- set attend person --------------------------- */

  backSidePeopleEl.addEventListener('click', (e) => {
    // set attend people
    let personsAfterSetAttend = uiBackSide.setAttendPerson(e, persons);

    if (personsAfterSetAttend) {
      persons = personsAfterSetAttend;
    } else {
      return;
    }

    // update mainTimer
    let attendPeople = dataPeople.getSelectedPeople(persons);
    timer.setIndiTimerMainTimerUpdatePeople(attendPeople);
  });

  /* ------------------------------ remove person ----------------------------- */

  backSidePeopleEl.addEventListener('click', (e) => {
    // UI: only works when click on 'X'
    if (e.target.className !== 'people-list-item__delete-btn') return;

    // minimum person count validator
    if (persons.length < 3) {
      popup.ok('');
      e.preventDefault();

      return;
    }

    // remove person
    persons = uiBackSide.removePerson(
      frontSidePeopleEl,
      backSidePeopleEl,
      mainStyle,
      e,
      persons,
    );

    // update mainTimer
    timer.setIndiTimerMainTimerUpdatePeople(persons);
  });

  /* -------------------------------------------------------------------------- */
  /*                               shortcuts                                    */
  /* -------------------------------------------------------------------------- */
  // press 'R' to reset
  window.addEventListener('keydown', (e) => {
    let currentPeople = uiShortcut.kbRest(swipeEl, needleEl, e, persons);
    if (currentPeople) currentPersons = currentPeople;
  });

  // press 'Space' to start spin
  window.addEventListener('keydown', (e) => {
    // turn needle
    let currentPeople = uiShortcut.kbStart(
      swipeEl,
      needleEl,
      e,
      persons,
      currentPersons,
    );
    if (currentPeople) currentPersons = currentPeople;
  });

  // press 'F' to flip
  window.addEventListener('keydown', (e) => {
    let currentPeople = uiShortcut.kbFlip(
      swipeEl,
      needleEl,
      inputEl,
      frontSidePeopleEl,
      e,
      mainStyle,
      persons,
    );
    if (currentPeople) currentPersons = currentPeople;
  });
};

/* -------------------------------------------------------------------------- */
/*                               slide up panel                               */
/* -------------------------------------------------------------------------- */

// click slideUpBtn to toggle slideupPannel
btnSlideUpEl.addEventListener('click', () => {
  isUp = uiSlideupPanel.setSlidePanelUp(
    isUp,
    modalBgEl,
    slideUpPanelEl,
    btnFlipEl,
  );
});

// click modalBg to close slideupPannel
modalBgEl.addEventListener('click', () => {
  isUp = uiSlideupPanel.setSlidePanelUp(
    isUp,
    modalBgEl,
    slideUpPanelEl,
    btnFlipEl,
  );
});

// click flipBtn to toggle plate flip
btnFlipEl.addEventListener('click', (e) => {
  let restPeople;
  let isSpinnerRunning = !(timer.mainTimerStatus == timer.onTimer.STOP);
  let isBack = uiSwipe.isBack(swipeEl);

  if (isSpinnerRunning && !isBack) {
    // popup validator
    if (popup.okCancel('Flip Spinner and restart?')) {
      restPeople = uiSlideupPanel.clickToFlip(
        swipeEl,
        needleEl,
        frontSidePeopleEl,
        mainStyle,
        persons,
      );
    } else {
      return;
    }
  } else {
    restPeople = uiSlideupPanel.clickToFlip(
      swipeEl,
      needleEl,
      frontSidePeopleEl,
      mainStyle,
      persons,
    );
  }

  if (restPeople) currentPersons = restPeople;
});
