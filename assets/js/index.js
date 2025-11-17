const state = {
  // Number bank
  bank: [],
  // Odd numbers
  odd: [],
  // Even numbers
  even: [],
  // Order display, acending or descending
  order: `ascending`
}

// Helper Functions
// Add number to bank name
const addTobank = (num) => {
  state.bank.push(num);
  orderList(state.order)
  render();
}

const orderList = (newOrder) => {
  state.order = newOrder;
  const { order } = state;
  for (array in state) {
    if (array === `bank` || array === `odd` || array === `even`) {
      if (order === `ascending`) {
        state[array].sort((a, b) => a - b);
      }
      else {
        state[array].sort((a, b) => b - a);
      }
    }
  }
  render()
}
// Add random number to bank
const randomNum = () => {
  // Create max and min
  const maxMin = {
    min: -1000,
    max: 1000
  }
  // Destructure to assign variables
  const { min, max } = maxMin;
  // Calculate random number and call add to bank
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  addTobank(randNum);
}
// Sort one number from bank to even or odd
const sortOneNum = () => {
  if (state.bank.length < 1) {
    return;
  }
  const numToSort = state.bank.shift();
  // If odd update odd state
  if (numToSort % 2 !== 0) {
    state.odd.push(numToSort);
  }
  // If even update even state
  else {
    state.even.push(numToSort);
  }
  orderList(state.order);
  // Re render the page with updated state
  render();
}
// Sort all numbers in bank
const sortAllNum = () => {
  // While the length is greater than zero sort the numbers
  while (state.bank.length > 0) {
    sortOneNum();
  }
}
// Sort the number of times of the user's choice
const sortManyTimes = (num) => {
  for (let i = 0; i < num; i++) {
    sortOneNum();
  }
}
// Create LIs for the corresponding list
const createLIs = (array) => {
  const newLIs = array.map((num) => `<li>${num}</li>`);
  return newLIs;
}
// Component Functions
// Form Component
const NumberForm = () => {
  // Create form element
  const $form = document.createElement(`form`);
  // Fill form element
  $form.innerHTML = `
  <label>
    Add a number to bank:
    <input id="input" name="new-numbers" />
  </label>
  <button class="add-btn" type="submit">Add Number</button>
  `;
  // Add event listener
  $form.addEventListener("submit", (event) => {
    // Prevent page from refreshing
    event.preventDefault();
    // Variables to store input value
    const formData = new FormData(event.target);
    const input = formData.get(`new-numbers`);
    // console.log(input);
    let inputArray = null;
    // Cannot input empty string
    if (input === ``) {
      alert(`Cannot be empty!`)
      return;
    }
    else {
      inputArray = input.split(`,`);
    }
    // Validate if all numbers were passed in
    for (let i = 0; i < inputArray.length; i++) {
      const currVal = inputArray[i];
      if (isNaN(currVal)) {
        alert(`${currVal} is not a number, please try again`);
        render();
        return;
      }
    }
    // If valid, add to bank
    const numArray = inputArray.map((num) => Number(num));
    numArray.forEach((num) => addTobank(num));
  });
  // Return form element
  return $form;
}
// Sort one button component
const SortOne = () => {
  // Create new button element and add class
  const $sortOneButton = document.createElement(`button`);
  $sortOneButton.classList.add(`sort-btn`);
  $sortOneButton.innerHTML = `Sort 1`;
  // Call sort one function when clicked
  $sortOneButton.addEventListener("click", (event) => {
    sortOneNum();
  });
  // Return button element
  return $sortOneButton;
}
// Sort all button component
const SortAll = () => {
  // Create new button element and add class
  const $sortAllButton = document.createElement(`button`);
  $sortAllButton.classList.add(`sort-btn`);
  $sortAllButton.innerHTML = `Sort All`;
  // Call sort all function when clicked
  $sortAllButton.addEventListener("click", (event) => {
    sortAllNum();
  });
  // Return button element
  return $sortAllButton;
}
// Generate random number button
const RandomNumBtn = () => {
  const $addRandomBtn = document.createElement(`button`);
  $addRandomBtn.classList.add(`add-btn`);
  $addRandomBtn.innerHTML = `Add Random Number`;
  $addRandomBtn.addEventListener("click", (event) => {
    randomNum();
  })
  return $addRandomBtn;
}
// Sort form component
const SortForm = () => {
  // Create form element
  const $sortForm = document.createElement(`form`);
  $sortForm.id = `sort-form`;
  // Create elements of form
  $sortForm.innerHTML = `
  <label>
    How many numbers do you want to sort?
    <input id="sort-input" name="sort" type="number" min="1" />
  </label>
  <button class="sort-btn" type="submit">Sort This Many Numbers</button>
  <label>
    Choose Ascending or Descending Order:
    <select name="order" id="order">
      <option value="null"></option>
      <option value="ascending">Ascending</option>
      <option value="descending">Descending</option>
    </select>
  </label>
  `;
  // Add event listener
  $sortForm.addEventListener("submit", (event) => {
    // Prevent page refresh
    event.preventDefault();
    // Get form data and store in variable
    const formData = new FormData(event.target);
    let inputNum = formData.get(`sort`);
    // Check for empty string
    if (inputNum === ``) {
      alert(`Cannot be empty!`)
      return;
    }
    // Turn input into number
    inputNum = Number(inputNum);
    // Check if number is greater than available
    if (inputNum > state.bank.length) {
      alert(`Cannot be greater than current bank!`);
      render();
      return;
    }
    // Call sort function to sort input number of times
    sortManyTimes(inputNum);
  });
  const $selection = $sortForm.querySelector(`#order`);
  $selection.addEventListener("change", (event) => {
    const order = event.target.value;
    console.log(order);
    if (order !== `null`) {
      orderList(order);
    }
  })
  // Return the sort form
  return $sortForm;
}
// Create a number bank list
const NumberList = (name) => {
  // Create unordered list
  const $list = document.createElement(`ul`);
  // Create list item variable
  let listItems = null;
  // Conditional to create list items for each state variable
  if (name === `bank`) {
    listItems = createLIs(state.bank);
  }
  else if (name === `odd`) {
    listItems = createLIs(state.odd);
  }
  else {
    listItems = createLIs(state.even);
  }
  $list.innerHTML = listItems.join(``);
  // Return the new list
  return $list;
}
// Render new elements to the DOM
const render = () => {
  // Select the main using id app
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Odds and Events</h1>
  <section id="form-and-btns">
    <FormInput id="number-form"></FormInput>
    <AddRandom></AddRandom><Sort1></Sort1><SortAll></SortAll>
  </section>
  <section>
    <SortForm id="sort-form"></SortForm>
  </section>
  <h2>Bank</h2>
  <NumberBank></NumberBank>
  <h2>Odds</h2>
  <OddNumbers></OddNumbers>
  <h2>Evens</h2>
  <EvenNumbers></EvenNumbers>`;
  // Replace placeholders with component functions
  document.querySelector(`#number-form`).replaceWith(NumberForm());
  document.querySelector(`Sort1`).replaceWith(SortOne());
  document.querySelector(`SortAll`).replaceWith(SortAll());
  document.querySelector(`#sort-form`).replaceWith(SortForm());
  document.querySelector(`NumberBank`).replaceWith(NumberList(`bank`));
  document.querySelector(`OddNumbers`).replaceWith(NumberList(`odd`));
  document.querySelector(`EvenNumbers`).replaceWith(NumberList(`even`));
  document.querySelector(`AddRandom`).replaceWith(RandomNumBtn());
}

render();
