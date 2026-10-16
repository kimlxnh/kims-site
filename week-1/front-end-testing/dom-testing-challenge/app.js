
const btn = document.querySelector('button');
const form = document.querySelector('#email-form');

const changeTitle = () => {
  const h1 = document.querySelector('h1');
  h1.textContent = 'Your Web Page';
}

const updateTitle = (e) => {
  e.preventDefault()
  const h1 = document.querySelector('h1');
  const input = document.querySelector('#name');

  h1.textContent = input.value;
  input.value = ''
}

btn.addEventListener('click', changeTitle)
form.addEventListener('submit', updateTitle)

