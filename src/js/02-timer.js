import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import "notiflix/dist/notiflix-aio-3.2.6.min.js"

const input = document.querySelector('[id="datetime-picker"]');
const start = document.querySelector('button');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDate;

start.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0][Symbol.toPrimitive]('number');

    if (selectedDate > Date.now()) {
      start.disabled = false;
    } else {
        start.disabled = true;
        Notify.warning('Please choose a date in the future')
     
    }
  },
};
flatpickr(input, options);

start.addEventListener('click', onStart, { once: true });
function onStart(evt) {
  start.disabled = true;
    input.disabled = true;
    
    const id = setInterval(() => {
        const leftTime = selectedDate - Date.now()
        
        days.textContent = addLeadingZero(convertMs(leftTime).days);
        hours.textContent = addLeadingZero(convertMs(leftTime).hours)
        minutes.textContent = addLeadingZero(convertMs(leftTime).minutes)
        seconds.textContent = addLeadingZero(convertMs(leftTime).seconds)
    if (leftTime <= 1000) {
      clearInterval(id);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
   return  value.toString().padStart(2, '0')
}

