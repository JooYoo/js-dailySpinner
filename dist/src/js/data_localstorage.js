// save people to localStorage
function savePeople(allPeople) {
  localStorage.setItem('dailyPeople', JSON.stringify(allPeople));
}

// load people from localStorage
function loadPeople() {
  const loadedPeople = JSON.parse(localStorage.getItem('dailyPeople'));
  if (loadedPeople) {
    return loadedPeople;
  }
}

export { savePeople, loadPeople };
