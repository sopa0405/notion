// variables
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00";
let timerInterval;

// set initial display
window.onload = () => {
    document.getElementById('minutes').innerHTML = formatTime(workTime);
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

// set work/break mode
function setMode(mode) {
    workTittle.classList.remove('active');
    breakTittle.classList.remove('active');

    if (mode === 'work') {
        workTittle.classList.add('active');
        document.getElementById('minutes').innerHTML = formatTime(workTime);
    } else if (mode === 'break') {
        breakTittle.classList.add('active');
        document.getElementById('minutes').innerHTML = formatTime(breakTime);
    }
    document.getElementById('seconds').innerHTML = seconds;
}

// start timer
function start() {
    document.getElementById('start').style.display = "none";
    document.getElementById('stop').style.display = "block";
    document.getElementById('reset').style.display = "block";

    clearInterval(timerInterval);

    let minutes = parseInt(document.getElementById('minutes').innerHTML);
    seconds = 59;

    timerInterval = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            minutes--;
            if (minutes < 0) {
                if (workTittle.classList.contains('active')) {
                    setMode('break');
                    minutes = breakTime;
                } else if (breakTittle.classList.contains('active')) {
                    setMode('work');
                    minutes = workTime;
                }
            }
            seconds = 59;
        }
        document.getElementById('minutes').innerHTML = formatTime(minutes);
        document.getElementById('seconds').innerHTML = formatTime(seconds);
    }, 1000);
}

// stop timer
function stop() {
    clearInterval(timerInterval);
    document.getElementById('start').style.display = "block";
    document.getElementById('stop').style.display = "none";
}

// format time to display with leading zeros
function formatTime(time) {
    return time.toString().padStart(2, '0');
}
