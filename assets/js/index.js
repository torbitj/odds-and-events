const state = {
  // Number bank
  bank: [32, 10, 15],
  // Odd numbers
  odd: [],
  // Even numbers
  even: []
}

// Sort one number from bank to even or odd
const sortOneNum = () => {
  const numToSort = state.bank.shift();
  // If odd update odd state
  if (numToSort % 2 === 1) {
    state.odd.push(numToSort);
  }
  // If even update even state
  else {
    state.even.push(numToSort);
  }
  // Re render the page with updated state
  render();
}

const sortAll = () => {
  
}

const render = () => {
  const $app = document.querySelector(`#app`);
  $app.innerHTML = `
  <h1>Odds and Events</h1>
  <p>Add a numToSort to the bank</p>
  <FormInput></FormInput>
  <h2>Bank</h2>
  <NumberBank></NumberBank>
  <h2>Odds</h2>
  <OddNumbers></OddNumbers>
  <h2>Evens</h2>
  <EvenNumbers></EvenNumbers>`;

}

render();
sortOneNum()
console.log(state)
sortAll()
console.log(state)