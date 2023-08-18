let workTime = 25;
let breakTime = 5;
let seconds = "00";
let isTimerRunning = false;
let timerInterval;
let breakCount = 0;

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;
    switchMode('work');
};

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        document.getElementById('start').style.display = "none";
        document.getElementById('stop').style.display = "block";
        timerInterval = setInterval(timerFunction, 1000);
    }
}

function stopTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    document.getElementById('stop').style.display = "none";
    document.getElementById('start').style.display = "block";
}

function resetTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    document.getElementById('stop').style.display = "none";
    document.getElementById('start').style.display = "block";
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";
    switchMode('work');
}

function updateTimerDisplay(minutes, seconds) {
    document.getElementById('minutes').innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').innerHTML = seconds < 10 ? `0${seconds}` : seconds;
}

function switchMode(mode) {
    if (mode === 'work') {
        workTime = 25;
        breakTime = 5;
        document.getElementById('work').classList.add('active');
        document.getElementById('break').classList.remove('active');
    } else if (mode === 'break') {
        workTime = 5;
        breakTime = 25;
        document.getElementById('break').classList.add('active');
        document.getElementById('work').classList.remove('active');
    }
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";
}

function timerFunction() {
    seconds = seconds - 1;

    if (seconds === -1) {
        if (workTime > 0 || breakTime > 0) {
            seconds = 59;

            let minutes = parseInt(document.getElementById('minutes').innerHTML);

            if (minutes === 0) {
                if (breakCount % 2 === 0) {
                    switchMode('break');
                } else {
                    switchMode('work');
                }
                breakCount++;
            }

            minutes = minutes - 1;
            updateTimerDisplay(minutes, seconds);
        }
    } else {
        updateTimerDisplay(parseInt(document.getElementById('minutes').innerHTML), seconds);
    }

    // Update ring animation duration based on time left
    let totalSeconds = parseInt(document.getElementById('minutes').textContent) * 60 + parseInt(document.getElementById('seconds').textContent);
    let duration = totalSeconds + "s";
    document.documentElement.style.setProperty('--timer-duration', duration);
}
