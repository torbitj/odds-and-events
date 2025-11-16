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
const sortAll = () => {
  // While the length is greater than zero sort the numbers
  while (state.bank.length > 0) {
    sortOneNum();
  }
}

// Component Functions
const NumberForm = () => {
  const $form = document.createElement(`form`);
  $form.innerHTML = `
  <label>
    Add a number to bank:
    <input name="new-number" type="number" />
  </label>
  <button id="add-btn" type="submit">Add Number</button>
  `;
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newNum = Number(formData.get(`new-number`));
    addTobank(newNum);
  });
  return $form;
}

const SortOne = () => {
  const $sortOneButton = document.createElement(`button`);
  $sortOneButton.classList.add(`sort-one-btn`);
  $sortOneButton.innerHTML = `Sort 1`;
  $sortOneButton.addEventListener("click", (event) => {
    if (state.bank.length > 0) {
      sortOneNum();
    }
    return;
  });
}

const render = () => {
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Odds and Events</h1>
  <FormInput id="number-form"></FormInput><Sort1></Sort1><SortAll></SortAll>
  <h2>Bank</h2>
  <NumberBank></NumberBank>
  <h2>Odds</h2>
  <OddNumbers></OddNumbers>
  <h2>Evens</h2>
  <EvenNumbers></EvenNumbers>`;

  document.querySelector(`#number-form`).replaceWith(NumberForm());
}

render();