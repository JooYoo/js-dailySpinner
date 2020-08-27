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

function getSelectedPeople(allPeople) {
  return allPeople.filter((person) => person.isAttend == true);
}

export { getSelectedPeople, Person };
