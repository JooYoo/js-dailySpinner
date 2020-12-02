import * as uiProgressRing from './ui_progress-ring.js';
import * as uiFrontSide from './ui_front-side.js';
import * as dataPeople from './data_people.js';
import * as timer from './timer.js';

// flip plate
function flipToFront(
  swipeEl,
  needleEl,
  peopleContainerEl,
  mainStyle,
  allPeople,
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
}

// rest needle
function resetNeedleUi(needleEl) {
  needleEl.classList.remove('turn--start');
  needleEl.classList.add('turn--reset');
}

export { resetAll, isBack, flipToBackAnim, flipToFrontAnim, flipToFront };
