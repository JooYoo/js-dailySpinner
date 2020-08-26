import * as uiFrontSide from './ui_front-side.js';

function setProgress(restPeople, allPeople) {
  if (!restPeople) return;

  let selectedPeople = uiFrontSide.getSelectedPersons(allPeople);

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
  document.documentElement.style.setProperty(
    '--spin-progressbar-percent',
    progressPercent
  );
}

export { setProgressUi, setProgress };
