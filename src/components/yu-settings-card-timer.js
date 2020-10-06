import * as settings from '../js/settings.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
/* -------------------------------------------------------------------------- */
/*                                 state-card                                 */
/* -------------------------------------------------------------------------- */

.slide-up-panel__state-card {
  position: relative;
  flex: 0 0 auto;
  /* height: 25vmin;*/
  width: 40vmin;
  margin: 3vmin;
  border-radius: 20px;
  border: #fff 0.2vmin solid;
  padding: 2vmin;
  background-color: #efeeee;
  background: linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.02),
    rgba(255, 255, 255, 1)
  );
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15),
    -5px -5px 10px rgba(255, 255, 255, 0.3);
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
  background-color: rgba(0, 0, 0, 0.5);
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
  border: 0.2vmin solid rgba(0, 0, 0, 0.1);
  border-radius: 34px;
  background-color: rgba(223, 222, 222, 1);
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
  border: 0.2vmin #ffffff solid;
  border-radius: 50%;

  font-family: monospace;
  font-size: 3.5vmin;
  text-align: center;

  background: linear-gradient(145deg, #ffffff, #d7d6d6);
  box-shadow: 5px 5px 10px #d0cfcf, -5px -5px 10px #ffffff;
}

.slide-up-panel__btns button:focus {
  outline: 0;
}
.slide-up-panel__btns button:active {
  background: #efeeee;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -6px -6px 26px 0 rgba(255, 255, 255, 0.9),
    6px 6px 16px 0 rgba(217, 210, 200, 0.5);
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

    /* -------------------------------- set icon -------------------------------- */
    // get iconAtt from instance in DOM
    let iconAtt = this.getAttribute('icon');
    // set this TimerCard icon
    settings.setTimerIcon(currentComponentId, iconAtt);

    /* ------------------------------- set toggle ------------------------------- */
    // get isToggleDisplayAtt from instance in DOM
    let isToggleDisplayAtt = this.getAttribute('isToggleDisplay');
    // set this TimeCard toggle visibility
    settings.setElVisibility(
      currentComponentId,
      'slide-up-panel__toggle-container',
      isToggleDisplayAtt
    );
    //TODO: set toggle function

    /* ----------------------------- set time number ---------------------------- */

    // TODO: time function

    /* ------------------------------ set time unit ----------------------------- */
    // get timeUnitAtt from instance in DOM
    let timeUnitAtt = this.getAttribute('timeUnit');
    // set this TimeCard timeUnit
    settings.setTimerText(
      currentComponentId,
      'slide-up-panel__state-card__time-unit',
      timeUnitAtt
    );

    /* -------------------------------- set btns -------------------------------- */
    // get isPlusMinusBtnsDisplayAtt from instance in DOM
    let isPlusMinusBtnsDisplayAtt = this.getAttribute('isPlusMinusBtnsDisplay');
    // set this TimeCard +/- btns visibility
    settings.setElVisibility(
      currentComponentId,
      'slide-up-panel__btns',
      isPlusMinusBtnsDisplayAtt
    );
    // TODO: +/- btns function

    /* ----------------------------- set description ---------------------------- */
    // get timeDescriptionAtt from instance in DOM
    let timeDescriptionAtt = this.getAttribute('timeDescription');
    // set this TimeCard timeDescription
    settings.setTimerText(
      currentComponentId,
      'slide-up-panel__state-card__time-text',
      timeDescriptionAtt
    );
  }
}

window.customElements.define('yu-settings-timer-card', YuSettingsTimerCard);
