import * as uiUtility from './ui_utility.js';
import * as uiSwipe from './ui_swipe.js';
import * as timer from './timer.js';

const setSlidePanelUp = (isUp, modalBgEl, slideUpPanelEl, btnFlipEl) => {
  isUp = !isUp;
  if (isUp) {
    uiUtility.toggleAnim(
      btnFlipEl,
      'btn-flip-anim__visible',
      'btn-flip-anim__hide',
    );
    uiUtility.toggleAnim(slideUpPanelEl, 'slide-down-anim', 'slide-up-anim');

    modalBgEl.style.opacity = '1';
    modalBgEl.style.pointerEvents = 'auto';
  } else {
    uiUtility.toggleAnim(
      btnFlipEl,
      'btn-flip-anim__hide',
      'btn-flip-anim__visible',
    );
    uiUtility.toggleAnim(slideUpPanelEl, 'slide-up-anim', 'slide-down-anim');

    modalBgEl.style.opacity = '0';
    modalBgEl.style.pointerEvents = 'none';
  }
  return isUp;
};

const clickToFlip = (
  swipeEl,
  needleEl,
  frontSidePeopleEl,
  mainStyle,
  persons,
) => {
  let isBack = uiSwipe.isBack(swipeEl);

  if (!isBack) {
    uiSwipe.flipToBackAnim(swipeEl);
  } else {
    return uiSwipe.flipToFront(
      swipeEl,
      needleEl,
      frontSidePeopleEl,
      mainStyle,
      persons,
    );
  }
};

export { setSlidePanelUp, clickToFlip };
