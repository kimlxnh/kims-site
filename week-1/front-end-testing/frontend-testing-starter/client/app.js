
const btn = document.querySelector('button');
const form = document.querySelector('form');
const darkModeBtn = document.querySelector('#dark-mode');


const changeTitle = () => {
  const h1 = document.querySelector('h1');
  h1.textContent = 'morning';
}

const updateTitle = (e) => {
  e.preventDefault()
  const h1 = document.querySelector('h1');
  const input = document.querySelector('#name');

  h1.textContent = input.value;
  input.value = ''
}

const changeMode = () => {
  document.querySelector('body')
    .classList.toggle('dark-mode');
}

btn.addEventListener('click', changeTitle)
form.addEventListener('submit', updateTitle)
darkModeBtn.addEventListener('click', changeMode)

