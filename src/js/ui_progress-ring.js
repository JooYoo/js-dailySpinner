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
  progressPercent = (progressDeg / 360) * 100;

  setProgressUi(progressPercent);
}

function setProgressUi(progressPercent) {
  // set main Timer
  setMainTimer(progressPercent);

  // set progress Ring
  setProgressRing(progressPercent);
}

/* ------------------------------ set mainTimer ----------------------------- */

function setMainTimer(progressPercent) {
  let mainTimerEl = document.querySelector('#mainTimer');
  let timeCount = 0;

  // get Timer state
  let timerStatus = checkIsTimerStop(progressPercent);
  console.log(`progressPercent:${progressPercent}`);
  console.log('isTimerStop:', timerStatus);

  //TODO: set MainTimer numericText
  // get mainTimerValueEl
  let mainTimerTextEl = mainTimerEl.shadowRoot.querySelector('#numeric-text');
  if (timerStatus == onTimer.START) {
    // set mainTimerValue each second
    setInterval(() => {
      mainTimerTextEl.innerHTML = `${timeCount++}`;
    }, 1000);
  }

  //TODO: set MainTimer progressRing
}

const onTimer = {
  DEFAULT: 'default',
  START: 'start',
  STOP: 'stop',
};

function checkIsTimerStop(targetNummber) {
  switch (true) {
    case targetNummber == 0:
      return onTimer.STOP;
    case targetNummber == 100:
      return onTimer.STOP;
    case targetNummber > 0:
      return onTimer.START;
    default:
      return onTimer.DEFAULT;
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
