const template = document.createElement('template');
template.innerHTML = `
<style>
    .toast-container {
       position: absolute;
       transform: translateX(-50%);
       left: 50%;
       display: flex;
       justify-content: space-around;
       width: 100%;
       bottom: 14%;
    }

    .toast__item {
       padding: 1% 10%;
       border-radius: 10px;
       box-shadow: -6px -6px 16px rgba(255, 255, 255, 1), 6px 6px 16px rgba(209, 205, 199, 1);
       font-size: 3vmin;
       color: rgba(0, 0, 0, 0.7);
       white-space: nowrap;
    }

</style>

<div class="toast-container">
  <span class="toast__item">Enter: spin</span>
  <span class="toast__item">F: flip</span>
  <span class="toast__item">R: reset</span>
</div>

`;

class YuToast extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('yu-toast', YuToast);
