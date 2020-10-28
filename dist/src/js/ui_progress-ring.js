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

  setProgressRing(progressPercent);
}

/* ---------------------------- set progressRing ---------------------------- */

function setProgressRing(targetNummber) {
  // get progressRingEl
  let yuProgressRingEl = document.querySelector('#progressRing');

  // set progressRing UI
  setProgressRingUi(yuProgressRingEl, targetNummber);

  // get progressPercentEl
  let progressPercentEl = yuProgressRingEl.shadowRoot.querySelector(
    '#numeric-text',
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

function setProgressRingUi(hostElement, targetNummber) {
  // get ringEl
  const ringEl = hostElement.shadowRoot.getElementById('ring');

  // get circle-dashoffset from hostEl
  let circleDashOffsetAtt = hostElement.getAttribute('circle-dashoffset');

  // set progressRingUi by targetNummber
  let strokeOffset = 440 - ((440 - circleDashOffsetAtt) * targetNummber) / 100;
  ringEl.style.strokeDashoffset = strokeOffset;
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

export { setProgressRingUi, setProgressRing, setProgress };
