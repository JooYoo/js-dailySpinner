import * as settings from '../js/settings.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
/* -------------------------------------------------------------------------- */
/*                                 state-card                                 */
/* -------------------------------------------------------------------------- */

:host {
  position: relative;
  flex: 0 0 auto;
  height: 25vmin;
  width: 40vmin;
  margin: 3vmin;
  border-radius: 20px;
  border: 0.2vmin solid var(--color-slide-up-card-border);
  padding: 2vmin;
  background-color: var(--color-slide-up-card-background);
  background: var(--color-slide-up-card-gradient);
  box-shadow: var(--color-slide-up-card-box-shadow);
}

.timer-card__icon {
  width: 5vmin;
  filter: invert(0.6);
}

.slide-up-panel__state-card__time-number {
  margin-left: -1vmin;
  font-family: monospace;
  font-weight: lighter;
  font-size: 10vmin;
  letter-spacing: -1vmin;
  text-align: left;
}

.slide-up-panel__state-card__time-unit {
  font-size: 5vmin;
}

.slide-up-panel__state-card__time-text {
  font-size: 3vmin;
  color: grey;
}

.slide-up-panel__controls {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-right: 1.5vmin;
  height: 100%;
}

/* -------------------------------------------------------------------------- */
/*                                 card toggle                                */
/* -------------------------------------------------------------------------- */

.slide-up-panel__toggle-container {
  position: relative;
  width: 6vmin;
  height: 3vmin;
}

.slide-up-panel__toggle-container input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slide-up-panel__toggle-container input:checked + .slider {
  background-color: var(--color-slide-up-card-toggle-right);
}

.slide-up-panel__toggle-container input:checked + .slider::before {
  transform: translateX(3vmin);
}

.slide-up-panel__toggle-container .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 0.2vmin solid var(--color-slide-up-card-toogle-border);
  border-radius: 34px;
  background-color: var(--color-slide-up-card-toggle-left);
  transition: 0.2s;
}

.slide-up-panel__toggle-container .slider::before {
  position: absolute;
  top: 0.3vmin;
  left: 0.3vmin;
  content: '';
  height: 2vmin;
  width: 2vmin;

  background-color: white;
  border-radius: 50%;
  transition: 0.2s;
}

/* -------------------------------------------------------------------------- */
/*                              plus / minus btns                             */
/* -------------------------------------------------------------------------- */

.slide-up-panel__btns {
  display: flex;
  flex-direction: column;
}

.slide-up-panel__btns button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6vmin;
  height: 6vmin;

  margin: 0 1vmin;
  border-radius: 50%;
  border: 0.2vmin solid var(--color-neu-btn-round-border);

  font-family: monospace;
  font-size: 3.5vmin;
  text-align: center;
  color: var(--color-slide-up-card-button-forecolor);

  background: var(--color-neu-btn-round-background);
  box-shadow: var(--color-neu-btn-round-box-shadow);
}

.slide-up-panel__btns button:focus {
  outline: 0;
}
.slide-up-panel__btns button:active {
  border: 1px solid var(--color-neu-btn-round-border);
  background: var(--color-neu-btn-round-background-active);
  box-shadow: var(--color-neu-btn-round-box-shadow-active);
}

.slide-up-panel__btns .btn-minus {
  margin-top: 2vmin;
}
</style>

<div id="slide-up-panel__state-card" class="slide-up-panel__state-card">
  <img id="timer-card__icon" class="timer-card__icon"/>

  <div class="slide-up-panel__state-card__time-container">
    <span
      id="slide-up-panel__state-card__time-number"
      class="slide-up-panel__state-card__time-number">0</span>
    <span
      id="slide-up-panel__state-card__time-unit"
      class="slide-up-panel__state-card__time-unit"></span>
    <div
      id="slide-up-panel__state-card__time-text"
      class="slide-up-panel__state-card__time-text"></div>
  </div>

  <div class="slide-up-panel__controls">
    <label id="slide-up-panel__toggle-container" class="slide-up-panel__toggle-container">
      <input id="slide-up-panel__toggle" type="checkbox" checked />
      <span class="slider"></span>
    </label>

    <div id="slide-up-panel__btns" class="slide-up-panel__btns">
      <button
        id="slide-up-panel__state-card__btn--plus"
        class="btn-plus">+</button>
      <button
        id="slide-up-panel__state-card__btn--minus"
        class="btn-minus">-</button>
    </div>
  </div>
</div>

`;

class YuSettingsTimerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // get current component ID
    let currentComponentId = this.shadowRoot.host.id;

    /* -------------------------------- init icon -------------------------------- */
    // get iconAtt from instance in DOM
    let iconAtt = this.getAttribute('icon');
    // init this TimerCard icon
    settings.initTimerIcon(currentComponentId, iconAtt);

    /* ------------------------------- init / set toggle ------------------------------- */
    // get isToggleDisplayAtt from instance in DOM
    let isToggleDisplayAtt = this.getAttribute('isToggleDisplay');
    // set this TimeCard toggle visibility
    settings.initElVisibility(
      currentComponentId,
      'slide-up-panel__toggle-container',
      isToggleDisplayAtt,
    );

    // get toggleEl
    const toggleEl = this.shadowRoot.getElementById('slide-up-panel__toggle');
    // get timeNrEl
    const timeNrEl = this.shadowRoot.getElementById(
      'slide-up-panel__state-card__time-number',
    );

    // set ring visibility
    toggleEl.addEventListener('change', () => {
      settings.setTimeRingToggle(currentComponentId, timeNrEl);
    });

    /* ------------------------------ init time unit ----------------------------- */
    // get timeUnitAtt from instance in DOM
    let timeUnitAtt = this.getAttribute('timeUnit');
    // set this TimeCard timeUnit
    settings.initCardText(
      currentComponentId,
      'slide-up-panel__state-card__time-unit',
      timeUnitAtt,
    );

    /* ----------------------------- init description ---------------------------- */
    // get timeDescriptionAtt from instance in DOM
    let timeDescriptionAtt = this.getAttribute('timeDescription');
    // set this TimeCard timeDescription
    settings.initCardText(
      currentComponentId,
      'slide-up-panel__state-card__time-text',
      timeDescriptionAtt,
    );

    /* -------------------------------- init btns -------------------------------- */
    // get isPlusMinusBtnsDisplayAtt from instance in DOM
    let isPlusMinusBtnsDisplayAtt = this.getAttribute('isPlusMinusBtnsDisplay');
    // set this TimeCard +/- btns visibility
    settings.initElVisibility(
      currentComponentId,
      'slide-up-panel__btns',
      isPlusMinusBtnsDisplayAtt,
    );

    /* ----------------------------- set time number ---------------------------- */
    // set time number
    settings.setTimeNr(currentComponentId, timeNrEl);

    /* -------------------------------- set btns -------------------------------- */
    // get plusBtnEl / minusBtnEl
    const plusBtnEl = this.shadowRoot.getElementById(
      'slide-up-panel__state-card__btn--plus',
    );
    const minusBtnEl = this.shadowRoot.getElementById(
      'slide-up-panel__state-card__btn--minus',
    );

    // on + btn click
    plusBtnEl.addEventListener('click', () => {
      settings.onCardBtnClick(currentComponentId, 'plusBtn');
      settings.setTimeNr(currentComponentId, timeNrEl);
    });

    // on - btn click
    minusBtnEl.addEventListener('click', () => {
      settings.onCardBtnClick(currentComponentId, 'minusBtn');
      settings.setTimeNr(currentComponentId, timeNrEl);
    });
  }
}

window.customElements.define('yu-settings-timer-card', YuSettingsTimerCard);
