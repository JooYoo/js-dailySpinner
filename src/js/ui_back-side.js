import * as UiFrontSide from './ui_front-side.js';
import * as dataLocalStorage from './data_localstorage.js';
import * as dataPeople from './data_people.js';

/* -------------------------------------------------------------------------- */
/*                         render Backside People list                        */
/* -------------------------------------------------------------------------- */
function renderBackSide(backSidePeopleEl, allPeople) {
  backSidePeopleEl.innerHTML = allPeople
    .map(
      (person) =>
        `
          <li id="${person.id}" class="people-list-item">
            <div class="people-list-item__box-name-container">
              <input id="${person.name}"
                class="people-list-item__checkbox" 
                type="checkbox" 
                ${person.isAttend ? 'checked' : ''}/>
              <label class="people-list-item__text" 
                for="${person.name}">${person.name}
              </label>
            </div>
            <button class="people-list-item__delete-btn">X</button>
          </li>
        `
    )
    .join('');
}

/* -------------------------------------------------------------------------- */
/*                                 add person                                 */
/* -------------------------------------------------------------------------- */

function addPerson(
  frontSidePeopleEl,
  backSidePeopleEl,
  backSidePeopleFormEl,
  mainStyle,
  inputVal,
  allPeople
) {
  // DT: save to localStorage
  dataPeople.addNewPerson(inputVal, allPeople);
  dataLocalStorage.savePeople(allPeople);

  // UI
  UiFrontSide.renderFrontSide(frontSidePeopleEl, mainStyle, allPeople);
  renderBackSide(backSidePeopleEl, allPeople);
  backSidePeopleFormEl.reset();
}

/* -------------------------------------------------------------------------- */
/*                                set isAttend person                         */
/* -------------------------------------------------------------------------- */

function setAttendPerson(backSidePeopleEl, allPeople) {
  backSidePeopleEl.addEventListener('click', (e) => {
    let selectedPersonName;
    if (e.target.id && e.target.id != 'people-list') {
      selectedPersonName = e.target.id;
    } else {
      return;
    }

    setPersonAttend(selectedPersonName, e, allPeople);
  });
}

function setPersonAttend(selectedPersonName, e, allPeople) {
  let selectedPerson = allPeople.find(
    (person) => person.name == selectedPersonName
  );
  selectedPerson.isAttend = !selectedPerson.isAttend;
  setPersonAttenUI(e.target.parentElement, selectedPerson.isAttend);
}

function setPersonAttenUI(parentEl, isAttend) {
  let personEl = parentEl.children[1];
  if (isAttend) {
    personEl.style.color = 'black';
  } else {
    personEl.style.color = 'gainsboro';
  }
}

/* -------------------------------------------------------------------------- */
/*                                remove People                               */
/* -------------------------------------------------------------------------- */

function removePerson(
  frontSidePeopleEl,
  backSidePeopleEl,
  newStyle,
  e,
  allPeople
) {
  let restPeople;
  let deleElId;

  // check if click on deleBtn
  if (e.target.className === 'people-list-item__delete-btn') {
    // DT: get deleteEl id + update allPeople
    deleElId = e.target.parentElement.id;
    restPeople = allPeople.filter((person) => person.id != deleElId);

    // UI: FrontSide + BackSide
    UiFrontSide.renderFrontSide(frontSidePeopleEl, newStyle, restPeople);
    renderBackSide(backSidePeopleEl, restPeople);

    // DT: save data
    dataLocalStorage.savePeople(restPeople);
  }

  return restPeople;
}

export { renderBackSide, setAttendPerson, addPerson, removePerson };
