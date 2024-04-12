const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const date = document.getElementById('date');
const timezone = document.getElementById('timezone');        

function setTime() {
    const now = new Date();
    const formatTime = (time) => (time < 10) ? `0${time}` : time;
    const getMeridian = (hrs) => (hrs < 12) ? 'am' : 'pm';

    const options = { weekday: 'long', month: 'long', day: 'numeric'};

    hours.textContent = formatTime(now.getHours() % 12);
    minutes.textContent = formatTime(now.getMinutes());
    getMeridian.textContent = getMeridian(now.getHours());
    date.textContent = now.toLocaleDateString('en-US', options);
    timezone = now.toLocaleTimeString('en-US', {timeZoneName: 'long'});
}

setTime();
setInterval(setTime, 1000);