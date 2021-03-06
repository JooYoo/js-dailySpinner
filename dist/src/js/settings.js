import * as timer from './timer.js';
import * as theme from './theme.js';
import * as sound from './sound.js';
import * as uiUtility from './ui_utility.js';
import * as dataPeople from './data_people.js';

/* ---------------------- init via DOM attribute ---------------------- */

const initTimerIcon = (timerCardElId, iconSrc) => {
  // get TimerCard => iconEl
  let timerCardEl = document.getElementById(timerCardElId);
  let iconEl = timerCardEl.shadowRoot.querySelector('#timer-card__icon');
  // set img src
  iconEl.src = iconSrc;
  // set icon color
  initTimerCardIconColor(timerCardElId, iconEl);
};

const initTimerCardIconColor = (timerCardElId, iconEl) => {
  switch (timerCardElId) {
    case 'mainTimerCard':
      iconEl.style.filter = uiUtility.getCssVar(
        '--color-slide-up-card-icon-filter-main-timer',
      );
      break;

    case 'personTimerCard':
      iconEl.style.filter = uiUtility.getCssVar(
        '--color-slide-up-card-icon-filter-individual-timer',
      );
      break;

    case 'progressRingCard':
      iconEl.style.filter = uiUtility.getCssVar(
        '--color-slide-up-card-icon-filter-progress',
      );
      break;

    case 'themeCard':
      iconEl.style.filter = uiUtility.getCssVar(
        '--color-slide-up-card-icon-filter-theme',
      );
      break;

    default:
      break;
  }
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

// init toggle state
const initSettingCardToggle = (currentComponentId) => {
  switch (currentComponentId) {
    // init toggleEl in individual-sound-card state
    case 'individualSoundCard':
      const individualSoundCardEl = document.getElementById(currentComponentId);
      const toggleEl = individualSoundCardEl.shadowRoot.querySelector(
        '#slide-up-panel__toggle',
      );
      toggleEl.checked = sound.isPlayIndividualSound;
      break;

    default:
      break;
  }
};

// set toggle when click
const setTimeRingToggle = (currentComponentId, timeNrEl) => {
  switch (currentComponentId) {
    case 'mainTimerCard':
      timer.toggleMainTimeRingVisibility();
      break;

    case 'personTimerCard':
      timer.togglePersonTimeRingVisibility();
      break;

    case 'progressRingCard':
      timer.toggleProgressRingVisibility();
      break;

    case 'themeCard':
      theme.toggleTheme();
      displayTimeNr(timeNrEl, theme.themeText);
      break;

    case 'soundCard':
      sound.toggleMainSound();
      break;

    case 'individualSoundCard':
      sound.toggleIndividualSound();
      break;

    default:
      break;
  }
};

let isInit = true;

const initMainTimer = () => {
  if (isInit) {
    // get all people in localstorage
    let persons = dataPeople.getSavedPeople();
    // set mainTimer by selected people
    timer.setCurrentMainTime(persons);

    isInit = false;
  }
};

const setTimeNr = (currentComponentId, timerNrEl) => {
  switch (currentComponentId) {
    case 'mainTimerCard':
      // init main timer
      initMainTimer();
      // render timer Nr
      displayTimeNr(timerNrEl, timer.mainTimerRingMinute);
      break;

    case 'personTimerCard':
      displayTimeNr(timerNrEl, timer.personTimerRingMin);
      break;

    case 'progressRingCard':
      displayTimeNr(timerNrEl, timer.progressRingNum);
      break;

    case 'themeCard':
      displayTimeNr(timerNrEl, theme.themeText);
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
      btnType == 'plusBtn' ? timer.setPlusPersonTime() : '';
      btnType == 'minusBtn' ? timer.setMinusPersonTime() : '';
      break;

    default:
      console.log('unknow button clicked');
      break;
  }
};

/* -------------------------- set app factoryReset -------------------------- */

const factoryResetHandler = () => {
  const answer = window.confirm('Clear data and restore DailySpinner?');
  if (answer) {
    // clear storage
    localStorage.clear();
    // reload app
    location.reload(true);
  } else {
    return;
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
  initSettingCardToggle,
  setTimeRingToggle,
  onCardBtnClick,
  factoryResetHandler,
};
