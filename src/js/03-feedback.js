import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = form.firstElementChild.firstElementChild;
const textarea = form.children[1].firstElementChild;
const valueObj = JSON.parse(localStorage.getItem('feedback-form-state')) ?? {
  email: '',
  message: '',
};

let email = valueObj.email;
let message = valueObj.message;
input.value = email;
textarea.value = message;

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

function onInput(evt) {
  const target = evt.target;
  target.nodeName === 'INPUT'
    ? (email = target.value)
    : (message = target.value);

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({
      email,
      message,
    })
  );
  valueObj.email = email;
  valueObj.message = message;
}

function onSubmit(evt) {
  evt.preventDefault();

  console.log(valueObj);

  valueObj.email = '';
  valueObj.message = '';

  input.value = '';
  textarea.value = '';
  localStorage.clear();
}
