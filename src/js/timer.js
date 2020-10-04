import * as datePeople from './data_people.js';
import * as uiUtility from './ui_utility.js';

let mainTimer;
let mainTimerRingMinute = 15;
let personTimer;
let personTimerRingMin = 3;

const onTimer = {
  START: 'start',
  RUNNING: 'running',
  LAST: 'last',
  STOP: 'stop',
};

/* ----------------------------- set personTimer ---------------------------- */

const setPersonTimer = (restPeople, allPeople) => {
  let tick = 0;

  // get Timer status
  let timerStatus = checkTimerStatus(restPeople, allPeople);

  //set PersonTimer numericText
  let personTimerEl = document.querySelector('#personTimer');
  let personTimerTextEl = personTimerEl.shadowRoot.querySelector(
    '#numeric-text'
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

  // hint: reset mainTimer
  // flipToFront()
  // resetAll()
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
    uiUtility.setCssVarShadowRoot(
      timerRingEl.shadowRoot.host,
      '--progress-value',
      currentPercent
    );
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

export { setMainTimer, setPersonTimer };
