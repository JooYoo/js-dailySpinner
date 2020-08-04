// get UI elements
const needle = document.querySelector('#spin-needle');
const btnTurn = document.querySelector('#btn-turn');
const spinContainerEl = document.querySelector('#spin-container');
const peopleContainerEl = document.querySelector('#people-container');
const personStyle = document.createElement('style');
const peopleListEl = document.querySelector('#people-list');
const peopleListTextboxEl = document.querySelector('.people-list__textbox');

// FIXME: remove
const btn = document.querySelector('#btn');

let isBack = false;
let isTapDownPlate = false;

// create Person-Object
let persons = [];
let selectedPersons = [];
let currentPersons;
let randomPerson;

class Person {
  constructor(name) {
    this.id = Person.setId();
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

persons.push(
  new Person('Sascha'),
  new Person('Adi'),
  new Person('Chris'),
);

//TODO: add person from Ui

function getSelectedPersons() {
  return persons.filter((person) => person.isAttend == true);
}

/* swipe to flip the dial plate */
// detect mousedown & touchstart in card
spinContainerEl.addEventListener('mousedown', (e) => {
  isTapDownPlate = true;
});

spinContainerEl.addEventListener('touchstart', (e) => {
  isTapDownPlate = true;
});

// detect mousemove & touchmove
window.addEventListener('mousemove', (e) => {
  onSwipeTo(e);
});

spinContainerEl.addEventListener('touchmove', (e) => {
  onSwipeTo(e);
});

function onSwipeTo(e) {
  if (!isTapDownPlate) return;

  let swipeTo = onSwipe(e);
  if (swipeTo) {
    flipPlate(isBack, swipeTo);
  }
}

// detect mouoseup & touchend anywhere
window.addEventListener('mouseup', () => {
  isTapDownPlate = false;
});

window.addEventListener('touchend', () => {
  isTapDownPlate = false;
});

// detect mouse move direction
let oldX = 0;
let oldY = 0;
const Swipe = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

// check swipe direction
function onSwipe(e) {
  if (e.changedTouches) {
    let result = checkDirection(
      oldX,
      oldY,
      e.changedTouches[0].screenX,
      e.changedTouches[0].screenY
    );
    if (result) {
      return result;
    }
  } else {
    let result = checkDirection(oldX, oldY, e.pageX, e.pageY);
    if (result) {
      return result;
    }
  }
}

function checkDirection(oldx, oldy, currx, curry) {
  let direction;

  if (currx == oldx && curry < oldy) {
    direction = Swipe.UP;
  } else if (currx == oldx && curry > oldy) {
    direction = Swipe.DOWN;
  } else if (currx < oldx && curry == oldy) {
    direction = Swipe.LEFT;
  } else if (currx > oldx && curry == oldy) {
    direction = Swipe.RIGHT;
  }

  oldX = currx;
  oldY = curry;

  if (direction) {
    return direction;
  }
}

// flip plate
function flipPlate(isBack, direction) {
  if (!isBack && direction === Swipe.RIGHT) {
    spinContainerEl.classList.add('spin-container__flip');
  } else {
    spinContainerEl.classList.remove('spin-container__flip');
  }

  isBack = !isBack;
  createPersonEls();
}

/* side__front*/
// create persons in UI
createPersonEls();
function createPersonEls() {
  peopleContainerEl.innerHTML = '';
  selectedPersons = getSelectedPersons();
  currentPersons = [...selectedPersons];
  setRotateDeg(selectedPersons);

  peopleContainerEl.innerHTML = selectedPersons
    .map(
      (person) =>
        `
          <div class="people people--${person.id}"></div>
        `
    )
    .join('');

  setPersonStyles();
}

// set rotateDeg for each person
function setRotateDeg(selectedPersons) {
  for (let i = 0; i < selectedPersons.length; i++) {
    selectedPersons[i].rotateDeg = (360 / selectedPersons.length) * i;
  }
}

// set style to persons in UI
function setPersonStyles() {
  personStyle.innerHTML = selectedPersons
    .map((person) => {
      if (person.rotateDeg > 90 && person.rotateDeg < 270) {
        return `
        .people--${person.id} {
          --person-position: ${person.rotateDeg}deg;
        }

        .people--${person.id}::before {
          content: "${person.name}";
          position: absolute;
          transform: translateX(-50%) rotate(180deg);
        }
        `;
      } else {
        return `
        .people--${person.id} {
          --person-position: ${person.rotateDeg}deg;
        }

        .people--${person.id}::before {
          content: "${person.name}";
        }
        `;
      }
    })
    .join('');
  document.head.appendChild(personStyle);
}

// click to get randomPerson no repeat
btnTurn.addEventListener('click', () => {
  // check if finish
  if (currentPersons.length === 0) {
    currentPersons = resetAll(selectedPersons);

    console.log('🍻');
  } else {
    // get random Person
    randomPerson = getRandomPerson(currentPersons);
    currentPersons = removePerson(currentPersons, randomPerson);

    setCssVar('--rotate-to', `${randomPerson.rotateDeg}deg`);

    // turn the needle
    needle.classList.remove('turn--reset');
    needle.classList.add('turn--start');
  }

  // set progressbar
  setProgress();

  // restart animation: reflow
  needle.style.animation = 'none';
  needle.offsetHeight;
  needle.style.animation = null;
});

// get random person
function getRandomPerson(allPersons) {
  let randomNr = Math.floor(Math.random() * allPersons.length);
  return allPersons[randomNr];
}

// remove person
function removePerson(allPersons, selectedPerson) {
  return allPersons.filter((x) => x !== selectedPerson);
}

// press 'R' to reset
window.addEventListener('keydown', (e) => {
  if (e.keyCode === 82) {
    currentPersons = resetAll(persons);
  }
});

// reset needle
function resetAll(allPersons) {
  needle.classList.remove('turn--start');
  needle.classList.add('turn--reset');

  return [...allPersons];
}

// progressbar
function setProgress() {
  let progressLength = selectedPersons.length;
  let progressLengthCurrent = currentPersons.length;
  let progressDegUnit = 360 / progressLength;
  let progressDeg;
  let progressPercent = 0;

  if (progressPercent < 100) {
    progressDeg = progressDegUnit * (progressLength - progressLengthCurrent);
  } else {
    progressDeg = 0;
  }
  progressPercent = (progressDeg / 360) * 100;

  setProgressUi(progressPercent);
}

function setProgressUi(progressPercent) {
  document.documentElement.style.setProperty(
    '--spin-progressbar-percent',
    progressPercent
  );
}

/*side__back*/
createPeopleList();
function createPeopleList() {
  peopleListEl.innerHTML = persons
    .map(
      (person) =>
        `
        <li class="people-list-item">
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

// isAttend logic
peopleListEl.addEventListener('click', (e) => {
  let selectedPersonName;
  if (e.target.id && e.target.id != 'people-list') {
    selectedPersonName = e.target.id;
  } else {
    return;
  }

  setPersonAttend(selectedPersonName, e);
});

function setPersonAttend(selectedPersonName, e) {
  let selectedPerson = persons.find(
    (person) => person.name == selectedPersonName
  );
  selectedPerson.isAttend = !selectedPerson.isAttend;
  setPersonAttenUI(e.target.parentElement, selectedPerson.isAttend);
  //TODO: reset front_side needle
}

function setPersonAttenUI(parentEl, isAttend) {
  let personEl = parentEl.children[1];
  if (isAttend) {
    personEl.style.color = 'black';
  } else {
    personEl.style.color = 'gainsboro';
  }
}

//add Person
function addPerson(e) {
  let inputValue = e.target.value;

  if (e.keyCode === 13 && inputValue) {
    e.preventDefault();

    persons.unshift(new Person(inputValue));
    peopleListTextboxEl.reset();
    createPersonEls();
    createPeopleList();
    //TODO: reset front_side

    console.log(persons);
  } else if (e.keyCode === 13 && !inputValue) {
    // press enter when no text inputed
    e.preventDefault();
  }
}

// TODO: remove Person

/*help functions*/
// get CSS var
function getCssVar(variable) {
  let style = getComputedStyle(document.body);
  return style.getPropertyValue(variable);
}

// set CSS var
function setCssVar(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

// click to flip FIXME: remove
btn.addEventListener('click', () => {
  if (!isBack) {
    spinContainerEl.classList.add('spin-container__flip');
  } else {
    spinContainerEl.classList.remove('spin-container__flip');
  }

  isBack = !isBack;
  createPersonEls();
});
