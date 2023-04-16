import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('[name="delay"]');
const delayStep = form.children[1].firstElementChild;
const amount = document.querySelector('[name="amount"]');
const createBtn = form.lastElementChild;
let counter;
let delayedTime;

createBtn.addEventListener('click', onCreate);
function onCreate(evt) {
  evt.preventDefault();

  counter = 0;
  delayedTime = 0;

  let delay = Number(firstDelay.value);
  const step = Number(delayStep.value);
  const promiseAmount = Number(amount.value);

  if (!promiseAmount) {
    return;
  } else {
    createBtn.disabled = true;
  }

  setTimeout(() => {
    counter += 1;
    delayedTime += delay;

    
    createPromise(counter, delay);
    if (counter === promiseAmount) {
      return;
    }

    const id = setInterval(() => {
      counter += 1;
      delayedTime += step;

      if (counter === promiseAmount) {
        createBtn.disabled = false;
        clearInterval(id);
      }
      createPromise(counter, delayedTime);
    }, step);
  }, delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    if (shouldResolve) {
      // Fulfill
      res({ position, delay });
    } else {
      // Reject
      rej({ position, delay });
    }
  })
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
