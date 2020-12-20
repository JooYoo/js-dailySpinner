const minPersonLengthTxt =
  '🤔 Think about it, if there is only one person in your team, why do you need this app? 🤔';

const okCancel = (text) => {
  const answer = window.confirm(text);
  if (answer) {
    return true;
  } else {
    return false;
  }
};

const ok = (text) => {
  !text ? alert(minPersonLengthTxt) : alert(text);
};

export { okCancel, ok };
