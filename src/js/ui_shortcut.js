import * as uiSwipe from './ui_swipe.js';
import * as uiFrontSide from './ui_front-side.js';

function kbRest(swipeElement, needleElement, e, allPeople) {
  if (e.keyCode === 82 && !uiSwipe.isBack(swipeElement)) {
    return uiSwipe.resetAll(swipeElement, needleElement, allPeople);
  }
}

function kbStart(swipeElement, needleElement, e, allPeople, currentPeople) {
  if (e.keyCode === 13 && !uiSwipe.isBack(swipeElement)) {
    return uiFrontSide.playSpinner(
      swipeElement,
      needleElement,
      allPeople,
      currentPeople
    );
  }
}

function kbFlip(
  swipeElement,
  needleElement,
  inputElement,
  frontSidePeopleElement,
  e,
  mainStyle,
  allPeople
) {
  let isBack;

  if (e.keyCode === 70 && !(inputElement === document.activeElement)) {
    isBack = uiSwipe.isBack(swipeElement);

    // check Side, if back to front + reset
    if (!isBack) {
      // onFront => flip to back
      uiSwipe.flipToBackAnim(swipeElement);
    } else {
      // onBack => flip to front
      return uiSwipe.flipToFront(
        swipeElement,
        needleElement,
        frontSidePeopleElement,
        mainStyle,
        allPeople
      );
    }
  }
}

export { kbRest, kbStart, kbFlip };
