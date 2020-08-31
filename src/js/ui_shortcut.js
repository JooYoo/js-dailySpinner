import * as uiSwipe from './ui_swipe.js';

function kbRest(swipeElement, needleElement, e, allPeople) {
  if (e.keyCode === 82 && !uiSwipe.isBack(swipeElement)) {
    return uiSwipe.resetAll(swipeElement, needleElement, allPeople);
  }
}

export { kbRest };
