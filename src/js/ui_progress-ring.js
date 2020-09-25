import * as dataPeople from './data_people.js';
import * as uiUtility from '../js/ui_utility.js';

function setProgress(restPeople, allPeople) {
  if (!restPeople) return;

  let selectedPeople = dataPeople.getSelectedPeople(allPeople);

  let progressLength = selectedPeople.length;
  let progressLengthCurrent = restPeople.length;
  let progressDegUnit = 360 / progressLength;
  let progressDeg;
  let progressPercent = 0;

  if (progressPercent < 100) {
    progressDeg = progressDegUnit * (progressLength - progressLengthCurrent);
  } else {
    progressDeg = 0;
  }

  //TODO: use restPeople and allPeople to check timerStatus
  setMainTimer(restPeople, allPeople);
  // console.log('restPeople:', restPeople.length);
  // console.log('allPeople:', allPeople.length);

  progressPercent = (progressDeg / 360) * 100;

  setProgressUi(progressPercent);
}

function setProgressUi(progressPercent) {
  // set progress Ring
  setProgressRing(progressPercent);
}

/* ------------------------------ set mainTimer ----------------------------- */
// TODO: those functions will be exported
function setMainTimer(restPeople, allPeople) {
  let mainTimerEl = document.querySelector('#mainTimer');
  let timeCount = 0;
  let mainTimer;

  // get Timer state
  let timerStatus = checkTimerStatus(restPeople.length, allPeople.length);
  console.log('isTimerStop:', timerStatus);

  //TODO: set MainTimer numericText

  // get mainTimerValueEl
  let mainTimerTextEl = mainTimerEl.shadowRoot.querySelector('#numeric-text');
  // if (timerStatus == onTimer.START) {
  //   // set mainTimerValue each second
  //   mainTimer = setInterval(() => {
  //     mainTimerTextEl.innerHTML = `${timeCount++}`;
  //   }, 1000);
  // }

  //TODO: set MainTimer progressRing
}

const onTimer = {
  START: 'start',
  RUNNING: 'running',
  LAST: 'last',
  STOP: 'stop',
};

function checkTimerStatus(restPeopleLength, allPeopleLength) {
  switch (true) {
    case restPeopleLength == allPeopleLength - 1:
      return onTimer.START;
    case restPeopleLength < allPeopleLength && restPeopleLength !== 0:
      return onTimer.RUNNING;
    case restPeopleLength == 0:
      return onTimer.LAST;
    case restPeopleLength == allPeopleLength:
      return onTimer.STOP;
    default:
      return onTimer.STOP;
  }
}

/* ---------------------------- set progressRing ---------------------------- */

function setProgressRing(targetNummber) {
  let yuProgressRingEl = document.querySelector('#progressRing');

  // set progressRing value
  uiUtility.setCssVarShadowRoot(
    yuProgressRingEl.shadowRoot.host,
    '--progress-value',
    targetNummber
  );

  // get progressPercentEl
  let progressPercentEl = yuProgressRingEl.shadowRoot.querySelector(
    '#numeric-text'
  );

  // get currentNum
  let currentNum = +progressPercentEl.innerHTML.slice(0, -1);
  if (!currentNum) currentNum = 0;

  // round the targetNum
  let targetNum = Math.round(targetNummber);

  // count up && down animation
  let displayNum = currentNum;
  countAnim(progressPercentEl, displayNum, targetNum);
}

function countAnim(progressPercentEl, displayNum, targetNum) {
  if (targetNum != 0) {
    const countUpAnim = () => {
      displayNum++;
      if (displayNum != targetNum) setTimeout(countUpAnim, 40);
      progressPercentEl.innerHTML = `${displayNum}%`;
    };
    countUpAnim();
  } else if (displayNum != 0) {
    const countDownAnim = () => {
      displayNum--;
      if (displayNum != 0) setTimeout(countDownAnim, 30);
      progressPercentEl.innerHTML = `${displayNum}%`;
    };
    countDownAnim();
  }
}

export { setProgressUi, setProgress };
