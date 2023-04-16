import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const player = new Player('vimeo-player');
let timePause = localStorage.getItem('videoplayer-current-time') ?? 0;
player.setCurrentTime(Number(timePause));

function onTimeUpdate(data) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
  timePause = data.seconds;
}

player.on('timeupdate', throttle(onTimeUpdate, 1000, { trailing: false }));
