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