import * as uiUtility from './ui_utility.js';

let isThemeDark = true;
let themeText = 'dark';

const toggleTheme = () => {
  const bodyEl = document.body;
  isThemeDark = !isThemeDark;

  if (isThemeDark) {
    bodyEl.classList.add('theme-dark');
    bodyEl.classList.remove('theme-light');
    themeText = 'dark';
    // set ring color
    setRingColor();
    // set card-icon color
    setSlideUpCardIconColor();
  } else {
    bodyEl.classList.add('theme-light');
    bodyEl.classList.remove('theme-dark');
    themeText = 'light';
    // set ring color
    setRingColor();
    // set card-icon color
    setSlideUpCardIconColor();
  }
};

const setRingColor = () => {
  // get ringEl, ringBgEl, numericTextEl
  const mainTimeRingEl = document
    .getElementById('mainTimer')
    .shadowRoot.querySelector('#ring');
  const mainTimeRingBgEl = document
    .getElementById('mainTimer')
    .shadowRoot.querySelector('#ring-bg');
  const mainTimeRingNumericTextEl = document
    .getElementById('mainTimer')
    .shadowRoot.querySelector('#numeric-text');
  // set color
  mainTimeRingEl.style.stroke = uiUtility.getCssVar('--color-ring-main-timer');
  mainTimeRingBgEl.style.stroke = uiUtility.getCssVar(
    '--color-ring-main-timer-bg',
  );
  mainTimeRingNumericTextEl.style.color = uiUtility.getCssVar(
    '--color-ring-main-timer-text',
  );

  // get progressRingEl, bg, text
  const progressRingEl = document
    .getElementById('progressRing')
    .shadowRoot.querySelector('#ring');
  const progressRingBgEl = document
    .getElementById('progressRing')
    .shadowRoot.querySelector('#ring-bg');
  const progressRingNumericTextEl = document
    .getElementById('progressRing')
    .shadowRoot.querySelector('#numeric-text');
  // set color
  progressRingEl.style.stroke = uiUtility.getCssVar('--color-ring-progress');
  progressRingBgEl.style.stroke = uiUtility.getCssVar(
    '--color-ring-progress-bg',
  );
  progressRingNumericTextEl.style.color = uiUtility.getCssVar(
    '--color-ring-progress-text',
  );

  // get personTimeRingEl, bg, text
  const personTimeRingEl = document
    .getElementById('personTimer')
    .shadowRoot.querySelector('#ring');
  const personTimeRingBgEl = document
    .getElementById('personTimer')
    .shadowRoot.querySelector('#ring-bg');
  const personTimeRingNumericTextEl = document
    .getElementById('personTimer')
    .shadowRoot.querySelector('#numeric-text');
  // set color
  personTimeRingEl.style.stroke = uiUtility.getCssVar(
    '--color-ring-individual-timer',
  );
  personTimeRingBgEl.style.stroke = uiUtility.getCssVar(
    '--color-ring-individual-timer-bg',
  );
  personTimeRingNumericTextEl.style.color = uiUtility.getCssVar(
    '--color-ring-individual-timer-text',
  );
};

const setSlideUpCardIconColor = () => {
  // get card-icon elements
  const mainTimerCardIconEl = document
    .getElementById('mainTimerCard')
    .shadowRoot.querySelector('#timer-card__icon');
  const progressCardIconEl = document
    .getElementById('progressRingCard')
    .shadowRoot.querySelector('#timer-card__icon');
  const individualTimerCardIconEl = document
    .getElementById('personTimerCard')
    .shadowRoot.querySelector('#timer-card__icon');
  const themeCardIconEl = document
    .getElementById('themeCard')
    .shadowRoot.querySelector('#timer-card__icon');
  // set color
  mainTimerCardIconEl.style.filter = uiUtility.getCssVar(
    '--color-slide-up-card-icon-filter-main-timer',
  );
  progressCardIconEl.style.filter = uiUtility.getCssVar(
    '--color-slide-up-card-icon-filter-progress',
  );
  individualTimerCardIconEl.style.filter = uiUtility.getCssVar(
    '--color-slide-up-card-icon-filter-individual-timer',
  );
  themeCardIconEl.style.filter = uiUtility.getCssVar(
    '--color-slide-up-card-icon-filter-theme',
  );
};

export { themeText, toggleTheme, setSlideUpCardIconColor };
