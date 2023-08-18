let timerInterval;
let isTimerRunning = false;
let breakCount = 0;

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00"

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        document.getElementById('start').style.display = 'none';
        document.getElementById('stop').style.display = 'block';
        timerInterval = setInterval(timerFunction, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById('start').style.display = 'block';
    document.getElementById('stop').style.display = 'none';
}

function updateTimerDisplay(minutes, seconds) {
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function switchMode(mode) {
    if (mode === 'work') {
        workTittle.classList.add('active');
        breakTittle.classList.remove('active');
    } else if (mode === 'break') {
        breakTittle.classList.add('active');
        workTittle.classList.remove('active');
    }
    let modeTime = mode === 'work' ? workTime : breakTime;
    updateTimerDisplay(modeTime, 0);
}

function timerFunction() {
    seconds = seconds - 1;

    if (seconds === -1) {
        if (workTime > 0 || breakTime > 0) {
            seconds = 59;

            let minutes =
