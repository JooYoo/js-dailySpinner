const setTimerIcon = (timerCardElId, iconSrc) => {
  // get TimerCard => iconEl
  let timerCardEl = document.getElementById(timerCardElId);
  let iconEl = timerCardEl.shadowRoot.querySelector('#timer-card__icon');
  // set img src
  iconEl.src = iconSrc;
};

const setElVisibility = (timerCardElId, elId, isDisplay) => {
  // get TimerCard => toggleEl
  let timerCardEl = document.getElementById(timerCardElId);
  let el = timerCardEl.shadowRoot.getElementById(elId);
  // set el visibility
  isDisplay === 'true'
    ? (el.style.visibility = 'visible')
    : (el.style.visibility = 'hidden');
};

const setTimerText = (timerCardElId, textElId, text) => {
  // get TimerCard => textEl
  let timerCardEl = document.getElementById(timerCardElId);
  let textEl = timerCardEl.shadowRoot.getElementById(textElId);
  // set text inside textEl
  textEl.innerHTML = text;
};

export { setTimerIcon, setElVisibility, setTimerText };
