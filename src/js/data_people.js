import * as dataLocalStorage from './data_localstorage.js';
class Person {
  constructor(name, id) {
    if (arguments.length == 2) {
      this.id = id;
    } else {
      this.id = Person.setId();
    }
    this.name = name;
    this.isAttend = true;
    this.rotateDeg;
  }

  static setId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }
}

const getSavedPeople = () => {
  let preloadPeople = dataLocalStorage.loadPeople();
  if (preloadPeople) {
    return dataLocalStorage.loadPeople();
  } else {
    return initPeople();
  }
};

function initPeople() {
  let persons = [];

  persons.push(
    new Person('Ruben'),
    new Person('Winnie'),
    new Person('Sascha'),
    new Person('Adi'),
    new Person('Chris'),
    new Person('Yu'),
    new Person('Ali'),
    new Person('Felix'),
    new Person('Slawa'),
  );

  return persons;
}

function getSelectedPeople(allPeople) {
  return allPeople.filter((person) => person.isAttend == true);
}

function addNewPerson(inputValue, allPeople) {
  // prevent WhiteSpace
  if (inputValue.trim() === '') return;
  // set new Id
  let newPersonId = allPeople.length + 1;
  let isIdExist = allPeople.find((person) => person.id == newPersonId);
  while (isIdExist) {
    newPersonId++;
    isIdExist = allPeople.find((person) => person.id == newPersonId);
  }
  allPeople.unshift(new Person(inputValue, newPersonId));
}

export { Person, getSavedPeople, getSelectedPeople, addNewPerson, initPeople };
