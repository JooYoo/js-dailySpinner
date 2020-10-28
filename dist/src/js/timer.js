import * as datePeople from './data_people.js';
import * as uiRing from './ui_progress-ring.js';

let mainTimer;
let mainTimerRingMinute = 15;
let isMainTimerActive = true;

let personTimer;
let personTimerRingMin = 3;
let isPersonTimerActive = true;

let progressRingNum = 100;
let isProgressRingActive = true;

const onTimer = {
  START: 'start',
  RUNNING: 'running',
  LAST: 'last',
  STOP: 'stop',
};

/* ----------------------------- set personTimer ---------------------------- */

const setPersonTimer = (restPeople, allPeople) => {
  // if isPersonTimerActive then active PersonTimer
  if (!isPersonTimerActive) return;

  let tick = 0;

  // get Timer status
  let timerStatus = checkTimerStatus(restPeople, allPeople);

  //set PersonTimer numericText
  let personTimerEl = document.querySelector('#personTimer');
  let personTimerTextEl = personTimerEl.shadowRoot.querySelector(
    '#numeric-text',
  );

  clearInterval(personTimer);

  if (timerStatus != onTimer.STOP) {
    personTimer = setInterval(() => {
      personTimerTextEl.innerHTML = `${setTimerText(tick++)}`;
      // set PersonTimer ProgressRing
      setTimerRing(personTimerRingMin, tick, '#personTimer');
    }, 1000);
  } else {
    personTimerTextEl.innerHTML = '00:00';
    // set PersonTimer ProgressRing
    setTimerRing(personTimerRingMin, tick, '#personTimer');
  }
};

/* ------------------------------ set mainTimer ----------------------------- */

function setMainTimer(restPeople, allPeople) {
  // if isMainTimeActive then active MainTimer
  if (!isMainTimerActive) return;

  let tick = 0;

  // get Timer state
  let timerStatus = checkTimerStatus(restPeople, allPeople);

  //set MainTimer numericText
  let mainTimerEl = document.querySelector('#mainTimer');
  let mainTimerTextEl = mainTimerEl.shadowRoot.querySelector('#numeric-text');

  // set MainTimer text && ring
  if (timerStatus == onTimer.START) {
    mainTimer = setInterval(() => {
      mainTimerTextEl.innerHTML = `${setTimerText(tick++)}`;
      // set MainTimer progressRing
      setTimerRing(mainTimerRingMinute, tick, '#mainTimer');
    }, 1000);
  } else if (timerStatus == onTimer.STOP) {
    clearInterval(mainTimer);
    mainTimerTextEl.innerHTML = '00:00';
    // set MainTimer progressRing
    setTimerRing(mainTimerRingMinute, tick, '#mainTimer');
  }
}

/* ----------------------------- Timer Ring ----------------------------- */

const setTimerRing = (targetMinutes, currentSecond, elementId) => {
  // calc current time to percent
  let totleSeconds = targetMinutes * 60;
  let currentPercent = (currentSecond / totleSeconds) * 100;

  // get mainTimerRingEl
  let timerRingEl = document.querySelector(elementId);

  // set ring by targetValue
  if (currentPercent <= 100) {
    uiRing.setProgressRingUi(timerRingEl.shadowRoot.host, currentPercent);
  }
};

/* ---------------------------- formate timerText --------------------------- */

const setTimerText = (timerText) => {
  if (timerText < 60) {
    return `00:${setTwoDigits(timerText)}`;
  } else if (timerText >= 60) {
    let minite = Math.floor(timerText / 60);
    let second = timerText % 60;

    return `${setTwoDigits(minite)}:${setTwoDigits(second)}`;
  }
};

const setTwoDigits = (num) => {
  return num > 9 ? num : `0${num}`;
};

/* ---------------------------- get Timer status ---------------------------- */

function checkTimerStatus(restPeople, allPeople) {
  let selectedPeople = datePeople.getSelectedPeople(allPeople);

  switch (true) {
    case restPeople.length == selectedPeople.length - 1:
      return onTimer.START;
    case restPeople.length < selectedPeople.length && restPeople.length !== 0:
      return onTimer.RUNNING;
    case restPeople.length == 0:
      return onTimer.LAST;
    case restPeople.length == selectedPeople.length:
      return onTimer.STOP;
    default:
      return onTimer.STOP;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  settings                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- settings__btns ----------------------------- */
// Main-Timer
const setPlusMainTime = () => {
  mainTimerRingMinute++;
};
const setMinusMainTime = () => {
  if (mainTimerRingMinute > 1) {
    mainTimerRingMinute--;
  }
};

// Personal-Timer
const setPlusPersonTime = () => {
  personTimerRingMin++;
};
const setMinusPersonTime = () => {
  if (personTimerRingMin > 1) {
    personTimerRingMin--;
  }
};

/* -------------------------- settings__card-toggle ------------------------- */
// Main-Timer
const toggleMainTimeRingVisibility = () => {
  const mainTimeRingEl = document.querySelector('#mainTimer');
  isMainTimerActive = !isMainTimerActive;
  isMainTimerActive
    ? (mainTimeRingEl.style.display = 'inherit')
    : (mainTimeRingEl.style.display = 'none');
};

// Personal-Timer
const togglePersonTimeRingVisibility = () => {
  const personTimeRingEl = document.querySelector('#personTimer');
  isPersonTimerActive = !isPersonTimerActive;
  isPersonTimerActive
    ? (personTimeRingEl.style.display = 'inherit')
    : (personTimeRingEl.style.display = 'none');
};

// Progress-Ring
const toggleProgressRingVisibility = () => {
  const progressRingEl = document.querySelector('#progressRing');
  isProgressRingActive = !isProgressRingActive;
  isProgressRingActive
    ? (progressRingEl.style.display = 'inherit')
    : (progressRingEl.style.display = 'none');
};

export {
  mainTimerRingMinute,
  personTimerRingMin,
  progressRingNum,
  setMainTimer,
  setPersonTimer,
  setPlusPersonTime,
  setMinusPersonTime,
  setPlusMainTime,
  setMinusMainTime,
  toggleMainTimeRingVisibility,
  togglePersonTimeRingVisibility,
  toggleProgressRingVisibility,
};
