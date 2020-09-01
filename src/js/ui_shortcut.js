import * as uiSwipe from './ui_swipe.js';
import * as uiFrontSide from './ui_front-side.js';

function kbRest(swipeElement, needleElement, e, allPeople) {
  if (e.keyCode === 82 && !uiSwipe.isBack(swipeElement)) {
    return uiSwipe.resetAll(swipeElement, needleElement, allPeople);
  }
}

function kbStart(swipeElement, needleElement, e, allPeople, currentPeople) {
  if (e.keyCode === 13 && !uiSwipe.isBack(swipeElement)) {
    console.log('kbStart');

    return uiFrontSide.playSpinner(
      swipeElement,
      needleElement,
      allPeople,
      currentPeople
    );
  }
}

export { kbRest, kbStart };
