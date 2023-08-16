const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');

let timer;
let isTimerRunning = false;
let timeLeft = 1500; // 25 minutes in seconds

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    timer = setInterval(updateTime, 1000);
    startButton.textContent = 'Pause';
  } else {
    clearInterval(timer);
    isTimerRunning = false;
    startButton.textContent = 'Resume';
  }
}

function updateTime() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  if (timeLeft === 0) {
    clearInterval(timer);
    isTimerRunning = false;
    startButton.textContent = 'Start';
    updateNotionDatabase();
  } else {
    timeLeft--;
  }
}

function updateNotionDatabase() {
  // Replace this with your Notion API code to update the database
  // Example: Send an HTTP request to your Notion API endpoint
  console.log('Updating Notion database...');
}

startButton.addEventListener('click', startTimer);
