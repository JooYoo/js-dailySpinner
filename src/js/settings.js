import * as timer from './timer.js';

/* ---------------------- init via DOM attribute ---------------------- */

const initTimerIcon = (timerCardElId, iconSrc) => {
  // get TimerCard => iconEl
  let timerCardEl = document.getElementById(timerCardElId);
  let iconEl = timerCardEl.shadowRoot.querySelector('#timer-card__icon');
  // set img src
  iconEl.src = iconSrc;
};

const initElVisibility = (timerCardElId, elId, isDisplay) => {
  // get TimerCard => toggleEl
  let timerCardEl = document.getElementById(timerCardElId);
  let el = timerCardEl.shadowRoot.getElementById(elId);
  // set el visibility
  isDisplay === 'true'
    ? (el.style.visibility = 'visible')
    : (el.style.visibility = 'hidden');
};

const initCardText = (timerCardElId, textElId, text) => {
  // get TimerCard => textEl
  let timerCardEl = document.getElementById(timerCardElId);
  let textEl = timerCardEl.shadowRoot.getElementById(textElId);
  // set text inside textEl
  textEl.innerHTML = text;
};

/* -------------------------- timer settings via UI ------------------------- */

const setTimeRingToggle = (currentComponentId) => {
  switch (currentComponentId) {
    case 'mainTimerCard':
      timer.toggleMainTimeRingVisibility();
      break;

    case 'personTimerCard':
      console.log('settings: setTimeRingToggle', 'personTimerCard');
      break;

    case 'progressRingCard':
      console.log('settings: setTimeRingToggle', 'progressRingCard');
      break;

    default:
      break;
  }
};

const setTimeNr = (currentComponentId, timerNrEl) => {
  switch (currentComponentId) {
    case 'mainTimerCard':
      displayTimeNr(timerNrEl, timer.mainTimerRingMinute);
      break;

    case 'personTimerCard':
      console.log('settings: setTimeNr', 'personTimerCard');
      break;

    case 'progressRingCard':
      console.log('settings: setTimeNr', 'progressRingCard');
      break;

    default:
      break;
  }
};

const onCardBtnClick = (currentComponentId, btnType) => {
  switch (currentComponentId) {
    case 'mainTimerCard':
      btnType == 'plusBtn' ? timer.setPlusMainTime() : '';
      btnType == 'minusBtn' ? timer.setMinusMainTime() : '';
      break;

    case 'personTimerCard':
      console.log('settings: onCardBtnClick', 'personTimerCard');
      break;

    default:
      console.log('unknow button clicked');
      break;
  }
};

/* ----------------------------- help functions ----------------------------- */

const displayTimeNr = (displayEl, displayValue) => {
  displayEl.innerHTML = displayValue;
};

export {
  initTimerIcon,
  initElVisibility,
  setTimeNr,
  initCardText,
  setTimeRingToggle,
  onCardBtnClick,
};
