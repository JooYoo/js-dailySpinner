function getSelectedPeople(allPeople) {
  return allPeople.filter((person) => person.isAttend == true);
}

export { getSelectedPeople };
