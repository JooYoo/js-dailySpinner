import * as UiFrontSide from './ui_front-side.js';
import * as uiUtility from './ui_utility.js';
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
              <label class="people-list-item__text side-back__people-text-attend--active" 
                for="${person.name}">${person.name}
              </label>
            </div>
            <button class="people-list-item__delete-btn">X</button>
          </li>
        `,
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
  allPeople,
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

function setAttendPerson(e, allPeople) {
  let people;
  let clickedPersonName;

  // UI: get clicked Person name
  if (e.target.id && e.target.id != 'people-list') {
    clickedPersonName = e.target.id;
  } else {
    return;
  }

  // UI + DT: set clickedPerson
  people = setPersonAttend(e, clickedPersonName, allPeople);

  return people;
}

function setPersonAttend(e, clickedPersonName, allPeople) {
  let clickedPerson;
  let backSidePeopleItemEl;
  let people;

  // DT: find the person + set isAttend
  clickedPerson = allPeople.find((person) => person.name == clickedPersonName);

  // check if clicked nothing
  if (!clickedPerson) return;

  clickedPerson.isAttend = !clickedPerson.isAttend;
  people = allPeople;

  // UI: get peopleItemEl set clicked Person UI
  backSidePeopleItemEl = e.target.parentElement;
  setPersonAttendUI(backSidePeopleItemEl, clickedPerson.isAttend);

  return people;
}

function setPersonAttendUI(parentEl, isAttend) {
  let personEl = parentEl.children[1];
  if (isAttend) {
    personEl.classList.remove('side-back__people-text-attend--deactive');
    personEl.classList.add('side-back__people-text-attend--active');
  } else {
    personEl.classList.remove('side-back__people-text-attend--active');
    personEl.classList.add('side-back__people-text-attend--deactive');
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
  allPeople,
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
