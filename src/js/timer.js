import * as datePeople from './data_people.js';
import * as uiRing from './ui_progress-ring.js';
import * as sound from './sound.js';

const onTimer = {
  START: 'start',
  RUNNING: 'running',
  LAST: 'last',
  STOP: 'stop',
};

let mainTimer;
//DEV: mainTimerRingMinute = 15
let mainTimerRingMinute = 15;
let isMainTimerActive = true;
let mainTimerStatus = onTimer.STOP;

let personTimer;
//DEV: personTimerRingMin = 3;
let personTimerRingMin = 3;
let isPersonTimerActive = true;

let progressRingNum = 100;
let isProgressRingActive = true;

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
      // set timer text
      personTimerTextEl.innerHTML = `${setTimerText(tick++)}`;
      // set PersonTimer ProgressRing
      setTimerRing(personTimerRingMin, tick, '#personTimer');
      // check if play individual sound
      playAudioHandler(
        tick,
        minutesToTick(personTimerRingMin),
        sound.isPlayIndividualSound,
        sound.individualAudioPlayer,
      );
    }, 1000);
  } else {
    personTimerTextEl.innerHTML = '00:00';
    // set PersonTimer ProgressRing
    setTimerRing(personTimerRingMin, tick, '#personTimer');
  }
  // clear individual-sound for each action to spinner
  sound.stopTimeOverAudio(sound.individualAudioPlayer);
};

/* ----------------------------- init mainTimer ----------------------------- */

const setCurrentMainTime = (allPeople) => {
  // get people count
  let peopleLength = datePeople.getSelectedPeople(allPeople).length;
  // set mainTimer by peopleCount and individualTime
  mainTimerRingMinute = personTimerRingMin * peopleLength;
};

/* ------------------------------ set mainTimer ----------------------------- */

function setMainTimer(restPeople, allPeople) {
  // if isMainTimeActive then active MainTimer
  if (!isMainTimerActive) return;

  let tick = 0;

  // get Timer state
  mainTimerStatus = checkTimerStatus(restPeople, allPeople);

  //set MainTimer numericText
  let mainTimerEl = document.querySelector('#mainTimer');
  let mainTimerTextEl = mainTimerEl.shadowRoot.querySelector('#numeric-text');

  // set MainTimer text && ring
  if (mainTimerStatus == onTimer.START) {
    mainTimer = setInterval(() => {
      // tick -> min:sec
      let displayTime = setTimerText(tick++);
      // display mainTime
      mainTimerTextEl.innerHTML = displayTime;
      // set MainTimer progressRing
      setTimerRing(mainTimerRingMinute, tick, '#mainTimer');
      // check if play timeOverAudio
      playAudioHandler(
        tick,
        minutesToTick(mainTimerRingMinute),
        sound.isPlayMainSound,
        sound.mainAudioPlayer,
      );
    }, 1000);
  } else if (mainTimerStatus == onTimer.STOP) {
    clearInterval(mainTimer);
    mainTimerTextEl.innerHTML = '00:00';
    // set MainTimer progressRing
    setTimerRing(mainTimerRingMinute, tick, '#mainTimer');
    // stop main-time over audio
    sound.stopTimeOverAudio(sound.mainAudioPlayer);
  }
}

const playAudioHandler = (
  currentTick,
  mainTimeTick,
  isPlaySound,
  audioPlayer,
) => {
  if (isPlaySound && currentTick === mainTimeTick) {
    sound.playTimeOverAudio(audioPlayer);
  }
};

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

const setTimerText = (tick) => {
  if (tick < 60) {
    return `00:${setTwoDigits(tick)}`;
  } else if (tick >= 60) {
    let minite = Math.floor(tick / 60);
    let second = tick % 60;

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

/* -------------------------------------------------------------------------- */
/*                               help functions                               */
/* -------------------------------------------------------------------------- */

const minutesToTick = (min) => {
  return 60 * min;
};

export {
  mainTimerRingMinute,
  personTimerRingMin,
  progressRingNum,
  mainTimerStatus,
  onTimer,
  setCurrentMainTime,
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
