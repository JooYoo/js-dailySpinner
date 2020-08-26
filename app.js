import * as uiSwipe from './src/js/ui_swipe.js';
import * as uiFrontSide from './src/js/ui_front-side.js';
import * as uiBackSide from './src/js/ui_back-side.js';
import * as dataLocalStorage from './src/js/data_localstorage.js';

// get UI elements
const needle = document.querySelector('#spin-needle');
const btnTurnEl = document.querySelector('#btn-turn');
const swipeEl = document.querySelector('#spin-container');
const peopleContainerEl = document.querySelector('#people-container');
const mainStyle = document.createElement('style');
const peopleListEl = document.querySelector('#people-list');
const peopleListFormEl = document.querySelector('#people-list__form');
const inputEl = peopleListFormEl['new-name'];

// create Person-Object
let persons = [];
let currentPersons = [];
//FIXME: can be remove after arrange backside
let selectedPersons = [];

class Person {
  constructor(name, id) {
    if (arguments.length == 2) {
      this.id = id;
    } else {
      this.id = Person.setId();
    }
    this.name = name;
    this.isAttend = true;
    this.rotateDeg;
  }

  static setId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

// validate if localStorage has data, otherwise push default people
let preloadPeople = dataLocalStorage.loadPeople();
if (preloadPeople) {
  persons = dataLocalStorage.loadPeople();
} else {
  persons.push(
    new Person('Sascha'),
    new Person('Adi')
    // new Person('Chris')
    // new Person('Yu')
    // new Person('Ali'),
    // new Person('Felix'),
    // new Person('Slawa')
  );
}

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
/*                        SWIPE: flip + reset                                  */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- start --------------------------------- */
swipeEl.addEventListener('mousedown', (e) => {
  uiSwipe.onSwipeMouseDonw(10);
});
swipeEl.addEventListener('touchstart', (e) => {
  uiSwipe.onSwipeTouchStart(0.2);
});

/* ----------------------------------- on ----------------------------------- */
window.addEventListener('mousemove', (e) => {
  let restPeople = uiSwipe.onSwipeTo(e, swipeEl, needle, mainStyle, persons);
  if (restPeople) currentPersons = restPeople;
});
swipeEl.addEventListener('touchmove', (e) => {
  let restPeople = uiSwipe.onSwipeTo(e, swipeEl, needle, mainStyle, persons);
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

// create persons in UI
currentPersons = uiFrontSide.createFsidePeoplePlate(
  peopleContainerEl,
  mainStyle,
  persons
);

// click to get randomPerson no repeat
btnTurnEl.addEventListener('click', () => {
  currentPersons = uiFrontSide.playSpinner(
    swipeEl,
    needle,
    persons,
    currentPersons
  );
});

/* -------------------------------------------------------------------------- */
/*                                 side__back                                 */
/* -------------------------------------------------------------------------- */
uiBackSide.createBsidePeopleList(peopleListEl, persons);
uiBackSide.setAttendPerson(peopleListEl, persons);
uiBackSide.addPerson(
  peopleContainerEl,
  peopleListEl,
  inputEl,
  mainStyle,
  persons,
  selectedPersons
);
uiBackSide.removePerson(
  peopleContainerEl,
  peopleListEl,
  mainStyle,
  persons,
  selectedPersons
);

/* -------------------------------------------------------------------------- */
/*                             TODO:  shortcuts                               */
/* -------------------------------------------------------------------------- */
// press 'R' to reset
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 82 && !(inputEl === document.activeElement) && !isBack()) {
    swipeToReset();
  }
});

// press 'F' to flip
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 70 && !(inputEl === document.activeElement)) flipPlate();
});

// press 'Enter' to turn
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 13 && !isBack()) playSpinner();
});
