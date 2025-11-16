const state = {
  // Number bank
  bank: [32, 10, 15],
  // Odd numbers
  odd: [],
  // Even numbers
  even: []
}

// Helper Functions
// Add number to bank array
const addTobank = (num) => {
  state.bank.push(num);
  render();
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

// Component Functions
// Form Component
const NumberForm = () => {
  // Create form element
  const $form = document.createElement(`form`);
  // Fill form element
  $form.innerHTML = `
  <label>
    Add a number to bank:
    <input name="new-number" type="number" />
  </label>
  <button id="add-btn" type="submit">Add Number</button>
  `;
  // Add event listener
  $form.addEventListener("submit", (event) => {
    // Prevent page from refreshing
    event.preventDefault();
    // Variables to store input value
    const formData = new FormData(event.target);
    const input = formData.get(`new-number`);
    // Cannot input empty string
    if (input === ``) {
      return;
    }
    // Convert to number and add to the bank state variable
    const newNum = Number(input);
    addTobank(newNum);

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
// Create a number bank list
const NumberList = (stateObj) => {
  // Create unordered list
  const $list = document.createElement(`ul`);
  let listItems = null;
  for (array in stateObj) {
    console.log(array)
    if (array === `bank`) {
      listItems = createLIs(state.bank);
    }
    else if (array === `odd`) {
      listItems = createLIs(state.odd);
    }
    else {
      listItems = createLIs(state.even);
    }
  }
  $list.innerHTML = listItems.join(``);
  return $list;
}
// Render new elements to the DOM
const render = () => {
  // Select the main using id app
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Odds and Events</h1>
  <section id="form-and-btns">
    <FormInput id="number-form"></FormInput><Sort1></Sort1><SortAll></SortAll>
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
  document.querySelector(`NumberBank`).replaceWith(NumberList(state));
}

render();