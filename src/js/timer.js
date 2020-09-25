import * as datePeople from './data_people.js';

const onTimer = {
  START: 'start',
  RUNNING: 'running',
  LAST: 'last',
  STOP: 'stop',
};

/* ------------------------------ set mainTimer ----------------------------- */

function setMainTimer(restPeople, allPeople, mainTimer) {
  let mainTimerEl = document.querySelector('#mainTimer');
  let tick = 0;

  // get Timer state
  let timerStatus = checkTimerStatus(restPeople, allPeople);
  console.log('isTimerStop:', timerStatus);

  //set MainTimer numericText
  let mainTimerTextEl = mainTimerEl.shadowRoot.querySelector('#numeric-text');

  // set mainTimerValue each second
  if (timerStatus == onTimer.START) {
    mainTimer = setInterval(() => {
      mainTimerTextEl.innerHTML = `${setTimerText(tick++)}`;
    }, 1000);
  } else if (timerStatus == onTimer.STOP) {
    clearInterval(mainTimer);
    mainTimerTextEl.innerHTML = '00:00';
  }

  // TODO: reset

  //TODO: set MainTimer progressRing

  return mainTimer;
}

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

export { setMainTimer };
