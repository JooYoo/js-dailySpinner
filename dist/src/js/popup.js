const okCancel = (text) => {
  const answer = window.confirm(text);
  if (answer) {
    return true;
  } else {
    return false;
  }
};

export { okCancel };
