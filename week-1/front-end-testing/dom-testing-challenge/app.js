const form = document.querySelector('#email-form');
const h1 = document.querySelector('h1');
const input = document.querySelector('#email');

const changeTitle = () => {
  const h1 = document.querySelector('h1');
  h1.textContent = 'Your Web Page';
}

const updateTitle = (e) => {
  e.preventDefault();
  h1.textContent = input.value;
  input.value = '';
};

if (form) {
  form.addEventListener('submit', updateTitle);
}

btn.addEventListener('click', changeTitle)
form.addEventListener('submit', updateTitle)

