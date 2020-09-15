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

function initPeople(people) {
  people.push(
    new Person('Ruben'),
    new Person('Winnie'),
    new Person('Sascha'),
    new Person('Adi'),
    new Person('Chris'),
    new Person('Yu'),
    new Person('Ali'),
    new Person('Felix'),
    new Person('Slawa')
  );

  return people;
}

function getSelectedPeople(allPeople) {
  return allPeople.filter((person) => person.isAttend == true);
}

function addNewPerson(inputValue, allPeople) {
  let newPersonId = allPeople.length + 1;
  let isIdExist = allPeople.find((person) => person.id == newPersonId);
  while (isIdExist) {
    newPersonId++;
    isIdExist = allPeople.find((person) => person.id == newPersonId);
  }
  allPeople.unshift(new Person(inputValue, newPersonId));
}

export { Person, getSelectedPeople, addNewPerson, initPeople };
