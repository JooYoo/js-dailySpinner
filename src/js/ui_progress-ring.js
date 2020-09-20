import * as dataPeople from './data_people.js';

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
  // set spin progressbar
  document.documentElement.style.setProperty(
    '--spin-progressbar-percent',
    progressPercent
  );

  // set progressbar percent
  setPercent(progressPercent);
}

function setPercent(targetNummber) {
  // get progressPercentEl
  let yuProgressRing = document.querySelector('#yuProgressRing');
  let progressPercentEl = yuProgressRing.shadowRoot.querySelector(
    '#spin-progressbar__percent'
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
