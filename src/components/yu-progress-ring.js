const template = document.createElement('template');
template.innerHTML = `
<style>
:host{
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spin-progressbar__percent {
    position: absolute;
    bottom: 18%;
    font: 0.8rem monospace;
    color: rgba(0, 0, 0, 0.15);
}

.spin-progressbar svg {
    overflow: visible;  
}

.spin-progressbar circle {
    fill: none;
    stroke-width: 8px;
    stroke-dasharray: 440;
    // stroke-dashoffset: 1240;
    stroke-linecap: round;
    overflow: visible;
}

.spin-progressbar circle:nth-child(1) {
    stroke: rgba(0, 0, 0, 0.02);
    stroke-dashoffset: 120;
}

.spin-progressbar circle:nth-child(2) {
    transition: stroke-dashoffset 2s ease-in-out;
    stroke-width: 7px;
    stroke: rgba(0, 0, 0, 0.15);
    stroke-dashoffset: calc(
      440 - (320 * var(--spin-progressbar-percent)) / 100
    );
}

.spin-progressbar {
    position: absolute;
    left: 50%;
    transform: translate(-50%) rotate(117deg);

    width: 73%;
    height: 73%;
  }
</style>

<div class="spin-progressbar">
    <svg viewbox="0 0 140 140">
      <circle cx="70" cy="70" r="60"></circle>
      <circle cx="70" cy="70" r="60"></circle>
    </svg>
</div>
<div id="spin-progressbar__percent" class="spin-progressbar__percent">
    0%
</div>
`;

class YuProgressRing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('yu-progress-ring', YuProgressRing);