import * as UiFrontSide from './ui_front-side.js';
import * as dataLocalStorage from './data_localstorage.js';

function createBsidePeopleList(peopleListEl, allPeople) {
  peopleListEl.innerHTML = allPeople
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
/*                                set isAttend person                         */
/* -------------------------------------------------------------------------- */

function setAttendPerson(peopleListEl, allPeople) {
  peopleListEl.addEventListener('click', (e) => {
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
/*                                 add person                                 */
/* -------------------------------------------------------------------------- */

function addPerson(
  peopleContainerEl,
  peopleListEl,
  inputEl,
  newStyle,
  allPeople,
  selectedPeople,
  currentPersons
) {
  peopleListEl.addEventListener('keydown', (e) => {
    let inputValue = inputEl.value;

    if (e.keyCode === 13 && inputValue) {
      e.preventDefault();

      addNewPerson(inputValue, allPeople);
      peopleListEl.reset();

      UiFrontSide.createFsidePeoplePlate(
        peopleContainerEl,
        newStyle,
        allPeople
      );
      createBsidePeopleList(peopleListEl, allPeople);
      dataLocalStorage.savePeople(allPeople);
    } else if (e.keyCode === 13 && !inputValue) {
      // press enter when no text inputed
      e.preventDefault();
    }
  });
}

function addNewPerson(inputValue, allPeople) {
  let newPersonId = allPeople.length + 1;
  let isIdExist = allPeople.find((person) => person.id == newPersonId);
  while (isIdExist) {
    newPersonId++;
    isIdExist = allPeople.find((person) => person.id == newPersonId);
  }
  allPeople.unshift(new Person(inputValue, newPersonId));
  //TODO: test if here need a return
}

/* -------------------------------------------------------------------------- */
/*                                remove People                               */
/* -------------------------------------------------------------------------- */

function removePerson(
  peopleContainerEl,
  peopleListEl,
  newStyle,
  allPeople,
  selectedPeople
) {
  peopleListEl.addEventListener('click', (e) => {
    let deleElId;

    if (e.target.className === 'people-list-item__delete-btn') {
      deleElId = e.target.parentElement.id;

      UiFrontSide.createFsidePeoplePlate(
        peopleContainerEl,
        newStyle,
        allPeople
      );
      createBsidePeopleList(peopleListEl, allPeople);
      dataLocalStorage.savePeople(allPeople);
      allPeople = allPeople.filter((person) => person.id != deleElId);
      //TODO: test if here need a return
    }
  });
}

export { createBsidePeopleList, setAttendPerson, addPerson, removePerson };
