// get UI elements
const needle = document.querySelector('#spin-needle');
const btnTurn = document.querySelector('#btn-turn');
const spinContainerEl = document.querySelector('#spin-container');
const peopleContainerEl = document.querySelector('#people-container');
const personStyle = document.createElement('style');
const btn = document.querySelector('#btn');

let isBack = false;
let isTapDownPlate = false;

// create Person-Object
let persons = [];
class Person {
  constructor(name) {
    this.id = Person.setId();
    this.name = name;
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
  new Person('Felix'),
  new Person('Yu'),
  new Person('Slawa'),
  new Person('Ali')
);

//TODO: add person from Ui
// persons.push(new Person('ABB'));

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
    flipCard(isBack, swipeTo);
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
function flipCard(isBack, direction) {
  if (!isBack && direction === Swipe.RIGHT) {
    spinContainerEl.classList.add('spin-container__flip');
  } else {
    spinContainerEl.classList.remove('spin-container__flip');
  }

  isBack = !isBack;
}

// set rotateDeg for each person
setRotateDeg(persons);
function setRotateDeg(persons) {
  for (let i = 0; i < persons.length; i++) {
    persons[i].rotateDeg = (360 / persons.length) * i;
  }
}

// create persons in UI
createPersonEls();
function createPersonEls() {
  peopleContainerEl.innerHTML = persons
    .map(
      (person) => `
        <div class="people people--${person.id}"></div>
        `
    )
    .join('');
}

// set style to persons in UI
setPersonStyles();
function setPersonStyles() {
  personStyle.innerHTML = persons
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
let currentPersons = [...persons];
let randomPerson;

btnTurn.addEventListener('click', () => {
  // check if finish
  if (currentPersons.length === 0) {
    currentPersons = resetAll(persons);

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

  console.log('reset');

  return [...allPersons];
}

// get CSS var
function getCssVar(variable) {
  let style = getComputedStyle(document.body);
  return style.getPropertyValue(variable);
}

// set CSS var
function setCssVar(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

// click to flip TODO: remove
// btn.addEventListener('click', () => {
//   if (!isBack) {
//     spinContainerEl.classList.add('spin-container__flip');
//   } else {
//     spinContainerEl.classList.remove('spin-container__flip');
//   }

//   isBack = !isBack;
// });
