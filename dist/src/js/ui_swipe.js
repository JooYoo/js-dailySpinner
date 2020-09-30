import * as uiProgressRing from './ui_progress-ring.js';
import * as uiFrontSide from './ui_front-side.js';
import * as dataPeople from './data_people.js';
import * as uiUtility from './ui_utility.js';
import * as timer from './timer.js';

let isTapDownPlate;
let interactionType;
let sensitivity = 0;
let direOld;
let direCur;
let direCount = 0;

const ControlBy = {
  MOUSE: 'MOUSE',
  TOUCH: 'TOUCH',
};

/* -------------------------------------------------------------------------- */
/*                detect mousedown & touchstart in swipeElement               */
/* -------------------------------------------------------------------------- */

function onSwipeMouseDonw(mouseSensitivity) {
  isTapDownPlate = true;
  interactionType = ControlBy.MOUSE;
  sensitivity = mouseSensitivity;
}

function onSwipeTouchStart(touchSensitivity) {
  isTapDownPlate = true;
  interactionType = ControlBy.TOUCH;
  sensitivity = touchSensitivity;
}

/* -------------------------------------------------------------------------- */
/*                detect mousemove & touchmove in swipeElement                */
/* -------------------------------------------------------------------------- */

// swipeUtil: main function
function onSwipeTo(
  e,
  swipeEl,
  needleEl,
  peopleContainerEl,
  mainStyle,
  allPeople
) {
  if (!isTapDownPlate) return;

  let restPeople;

  //FIXME: (write a function) output Direction by sensitivity
  direOld = onSwipe(e);
  if (!direOld) return;
  if (direCur === direOld) {
    increaseDireCount();
  } else {
    direCount = 0;
    direCur = direOld;
  }
  if (direCount != sensitivity) {
    return;
  }
  let swipeTo = direCur;
  // console.log(swipeTo, direCount);
  // (func end)

  if (swipeTo === Swipe.UP && !isBack(swipeEl)) {
    // UP: reset
    restPeople = resetAll(swipeEl, needleEl, allPeople);
  } else if (swipeTo === Swipe.RIGHT && !isBack(swipeEl)) {
    // => to Back
    flipToBackAnim(swipeEl);
  } else if (swipeTo === Swipe.LEFT) {
    // <= to Front
    restPeople = flipToFront(
      swipeEl,
      needleEl,
      peopleContainerEl,
      mainStyle,
      allPeople
    );
  } else if (swipeTo === Swipe.DOWN) {
    // DOWN: toast
  }

  return restPeople;
}

// flip plate
function flipToFront(
  swipeEl,
  needleEl,
  peopleContainerEl,
  mainStyle,
  allPeople
) {
  let restPeople;
  let selectedPeople;

  // UI: plate rotate animation
  flipToFrontAnim(swipeEl);

  // UI: create frontUI
  uiFrontSide.renderFrontSide(peopleContainerEl, mainStyle, allPeople);

  // UI: rest needle
  resetNeedleUi(needleEl);

  // UI: reset ProgressUI
  uiProgressRing.setProgressRing(0);

  // reset swipe sensetivity
  direCount = 0;

  // DT
  selectedPeople = dataPeople.getSelectedPeople(allPeople);
  restPeople = [...selectedPeople];

  // set mainTimer
  timer.setMainTimer(restPeople, allPeople);

  // set personTimer
  timer.setPersonTimer(restPeople, allPeople);

  return restPeople;
}

function flipToBackAnim(swipeEl) {
  swipeEl.classList.add('spin-container__flip');
}

function flipToFrontAnim(swipeEl) {
  swipeEl.classList.remove('spin-container__flip');
}

function isBack(swipeEl) {
  return swipeEl.classList.contains('spin-container__flip');
}

// swipeUti: filter the useless direction signal in swipe process
function increaseDireCount() {
  if (interactionType === ControlBy.MOUSE) {
    direCount++;
  } else if (interactionType === ControlBy.TOUCH) {
    direCount += 0.1;
  }
}

/* --------------------- TODO: can be save as own module -------------------- */

let oldX = 0;
let oldY = 0;
const Swipe = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

// check direction: main function TODO: change the func name
function onSwipe(e) {
  if (e.changedTouches) {
    let result = checkDirection(
      oldX,
      oldY,
      e.changedTouches[0].screenX,
      e.changedTouches[0].screenY
    );
    if (result) {
      return result;
    }
  } else {
    let result = checkDirection(oldX, oldY, e.pageX, e.pageY);
    if (result) {
      return result;
    }
  }
}

function checkDirection(oldx, oldy, currx, curry) {
  let direction;

  if (currx == oldx && curry < oldy) {
    direction = Swipe.UP;
  } else if (currx == oldx && curry > oldy) {
    direction = Swipe.DOWN;
  } else if (currx < oldx && curry == oldy) {
    direction = Swipe.LEFT;
  } else if (currx > oldx && curry == oldy) {
    direction = Swipe.RIGHT;
  }

  oldX = currx;
  oldY = curry;

  if (direction) {
    return direction;
  }
}

/* -------------------------------------------------------------------------- */
/*                  detect mouseup & touchend in swipeElement                 */
/* -------------------------------------------------------------------------- */

function onSwipeMouseUp() {
  isTapDownPlate = false;
}

function onSwipeTouchEnd() {
  isTapDownPlate = false;
}

/* -------------------------------------------------------------------------- */
/*                      reset needle, progressRing, data                      */
/* -------------------------------------------------------------------------- */

function resetAll(swipeEl, needleEl, allPeople) {
  let restPeople;
  let selectedPeople;

  // UI: swipe to reset all UI
  swipeToResetUi(swipeEl, needleEl);

  // DT
  selectedPeople = dataPeople.getSelectedPeople(allPeople);
  restPeople = [...selectedPeople];

  // set mainTimer
  timer.setMainTimer(restPeople, allPeople);

  // set personTimer
  timer.setPersonTimer(restPeople, allPeople);

  return restPeople;
}

// restUi
function swipeToResetUi(swipeEl, needleEl) {
  // plate rest Animation
  swipeEl.classList.add('spin-container__flip--rest');
  swipeEl.addEventListener('animationend', () => {
    swipeEl.classList.remove('spin-container__flip--rest');
  });

  // rest needle
  resetNeedleUi(needleEl);

  // reset ProgressUI
  uiProgressRing.setProgressRing(0);

  // reset selectedPerson Anim
  uiFrontSide.resetSelectedPersonUI();

  // reset swipe sensetivity
  direCount = 0;
}

// rest needle
function resetNeedleUi(needleEl) {
  needleEl.classList.remove('turn--start');
  needleEl.classList.add('turn--reset');
}

export {
  ControlBy,
  isTapDownPlate,
  onSwipeMouseDonw,
  onSwipeTouchStart,
  onSwipeTo,
  onSwipeMouseUp,
  onSwipeTouchEnd,
  resetAll,
  isBack,
  flipToBackAnim,
  flipToFrontAnim,
  flipToFront,
};
