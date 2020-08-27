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
  // DT
  addNewPerson(inputVal, allPeople);
  backSidePeopleFormEl.reset();

  // UI
  UiFrontSide.renderFrontSide(frontSidePeopleEl, mainStyle, allPeople);
  renderBackSide(backSidePeopleEl, allPeople);

  // DT: save to localStorage
  dataLocalStorage.savePeople(allPeople);
}

// FIXME: store into people.js
function addNewPerson(inputValue, allPeople) {
  let newPersonId = allPeople.length + 1;
  let isIdExist = allPeople.find((person) => person.id == newPersonId);
  while (isIdExist) {
    newPersonId++;
    isIdExist = allPeople.find((person) => person.id == newPersonId);
  }
  allPeople.unshift(new dataPeople.Person(inputValue, newPersonId));
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
  allPeople,
  selectedPeople
) {
  backSidePeopleEl.addEventListener('click', (e) => {
    let deleElId;

    if (e.target.className === 'people-list-item__delete-btn') {
      deleElId = e.target.parentElement.id;

      UiFrontSide.renderFrontSide(frontSidePeopleEl, newStyle, allPeople);
      renderBackSide(backSidePeopleEl, allPeople);
      dataLocalStorage.savePeople(allPeople);
      allPeople = allPeople.filter((person) => person.id != deleElId);
      //TODO: test if here need a return
    }
  });
}

export { renderBackSide, setAttendPerson, addPerson, removePerson };
