const body = document.querySelector('body');
const start = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let id

stopBtn.disabled = true
start.addEventListener('click', onStart);
function onStart() {
    start.disabled = true
    stopBtn.disabled = false
  id = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

stopBtn.addEventListener('click', onStop)
function onStop() {
    stopBtn.disabled = true
    start.disabled = false
    clearInterval(id)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
console.dir(stopBtn)
