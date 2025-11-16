const state = {
  // Number bank
  bank: [],
  // Odd numbers
  odd: [],
  // Even numbers
  even: []
}

// Sort one number from bank to even or odd
const sortOneNum = (number) => {
  // If odd update odd state
  if (number % 2 === 1) {
    state.odd.push(number);
  }
  // If even update even state
  else {
    state.even.push(number);
  }
  // Re render the page with updated state
  render();
}

const render = () => {
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Odds and Events</h1>
  <p>Add a number to the bank</p>
  <FormInput></FormInput>
  <h2>Bank</h2>
  <NumberBank></NumberBank>
  <h2>Odds</h2>
  <OddNumbers></OddNumbers>
  <h2>Evens</h2>
  <EvenNumbers></EvenNumbers>`;

}

render();