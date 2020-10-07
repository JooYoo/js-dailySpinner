// get CSS var
function getCssVar(variable) {
  let style = getComputedStyle(document.body);
  return style.getPropertyValue(variable);
}

// get CSS var from shadowRoot
function getCssVarShadowRoot(hostEl, variable) {
  let style = getComputedStyle(hostEl);
  return style.getPropertyValue(variable);
}

// set CSS var
function setCssVar(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

// set CSS var shadowRoot
function setCssVarShadowRoot(hostEl, variable, value) {
  hostEl.style.setProperty(variable, value);
}

// add element next to another
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// toggle animation
const toggleAnim = (el, removeClass, addClass) => {
  el.classList.remove(removeClass);
  el.classList.add(addClass);
};

export {
  getCssVar,
  getCssVarShadowRoot,
  setCssVar,
  setCssVarShadowRoot,
  insertAfter,
  toggleAnim,
};
