import * as uiUtility from '../js/ui_utility.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host{
  --circle-r: 60;
  --circle-bg-dashoffset: 120;
  --numeric-height: 18%;
  --progress-value: 0;

  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spin-progressbar svg {
    overflow: visible;  
}

.spin-progressbar circle {
    fill: none;
    stroke-width: 8px;
    stroke-dasharray: 440;
    stroke-linecap: round;
    overflow: visible;
}

.spin-progressbar circle:nth-child(1) {
    cx: 70;
    cy: 70;
    r: var(--circle-r);

    stroke: rgba(0, 0, 0, 0.02);
    stroke-dashoffset: var(--circle-bg-dashoffset);
}

.spin-progressbar circle:nth-child(2) {
    cx: 70;
    cy: 70;
    r: var(--circle-r);

    stroke-width: 7px;
    stroke: rgba(0, 0, 0, 0.15);
    stroke-dashoffset: calc(
      440 - ((440 - var(--circle-bg-dashoffset)) * var(--progress-value)) / 100
    );
    
    transition: stroke-dashoffset 1s ease-out;
}

.spin-progressbar {
    position: absolute;
    left: 50%;
    transform: translate(-50%) rotate(117deg);

    width: 73%;
    height: 73%;
}

.numeric-text {
  position: absolute;
  bottom: var(--numeric-height);
  font-size: 0.7rem;
  letter-spacing: .05rem;
  color: rgba(0, 0, 0, 0.15);
}
</style>

<div class="spin-progressbar">
    <svg viewbox="0 0 140 140">
      <circle id="ring-bg"></circle>
      <circle id="ring"></circle>
    </svg>
</div>
<div id="numeric-text" class="numeric-text">
    0%
</div>
`;

class YuProgressRing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // get component ID
    let currentComponentId = this.shadowRoot.host.id;

    /* ------------------------------ set ring size ----------------------------- */
    // get circleR, circleDashOffset from DOM
    let circleRAtt = this.getAttribute('circle-r');
    let circleDashOffsetAtt = this.getAttribute('circle-dashoffset');
    // set circleR, circleDashOffset to CSS var
    uiUtility.setCssVarShadowRoot(
      this.shadowRoot.host,
      '--circle-r',
      circleRAtt
    );
    uiUtility.setCssVarShadowRoot(
      this.shadowRoot.host,
      '--circle-bg-dashoffset',
      circleDashOffsetAtt
    );

    /* -------------------------- set numeric position -------------------------- */
    // get numeric-height from DOM
    let numericAtt = this.getAttribute('numeric-height');
    // set numeric-height to CSS var
    uiUtility.setCssVarShadowRoot(
      this.shadowRoot.host,
      '--numeric-height',
      numericAtt
    );

    /* ----------------------------- set ring color ----------------------------- */
    // get high-light-color && ringColor from DOM
    let ringEl = this.shadowRoot.querySelector('#ring');
    let ringColor = this.getAttribute('high-light-color');
    // let ringColor = this.getRingColor(currentComponentId);
    // set ringEl high-light-color
    ringEl.style.stroke = ringColor;
    // set ringBgEl color
    let ringBgEl = this.shadowRoot.querySelector('#ring-bg');
    ringBgEl.style.stroke = this.setRingBgColor(ringColor);

    /* ---------------------------- set numeric text ---------------------------- */
    let numericTextAtt = this.getAttribute('numeric-text');
    let numericTextEl = this.shadowRoot.querySelector('#numeric-text');
    numericTextEl.innerHTML = numericTextAtt;
    numericTextEl.style.color = ringColor;
  }

  /* ----------------------------- help functions ----------------------------- */

  getRingColor(thisComponentId) {
    let thisColor;
    switch (thisComponentId) {
      case "mainTimer":
        thisColor = uiUtility.getCssVar('--color-ring-main-timer');
        break;
      
      case "progressRing":
        thisColor = uiUtility.getCssVar('--color-ring-individual-timer');
        break;

      case "personTimer":
        thisColor = uiUtility.getCssVar('--color-ring-progress');
        break;
      
        default:
          break;
    }

    return thisColor;
  }

  setRingBgColor(ringColor) {
    // split rgba by ','
    let ringColorArr = ringColor.split(',');
    // set new color to ringBg
    ringColorArr[3] = ' 0.2)';
    let ringBgColor = ringColorArr.toString();

    return ringBgColor;
  }
}

window.customElements.define('yu-progress-ring', YuProgressRing);
