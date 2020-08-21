// get CSS var
function getCssVar(variable) {
  let style = getComputedStyle(document.body);
  return style.getPropertyValue(variable);
}

// set CSS var
function setCssVar(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

export { getCssVar, setCssVar };
