let countdown;
let totalTime = 0;
let currentTime = 0;

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const percentVal = document.getElementById("percentVal");
const msg = document.getElementById("msg");


stopButton.disabled = true;
resetButton.disabled = true;
function startTimer() {
  if (totalTime === 0) {
    totalTime = (parseInt(hours.value) * 3600) + (parseInt(minutes.value) * 60) + parseInt(seconds.value);
    currentTime = totalTime;
    updateTimerDisplay();
  }
  if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
    msg.innerHTML = "Enter a value to start the countdown!";
    startButton.disabled = false;

  }
  if (totalTime !== 0) {
    msg.innerHTML = "";
    startButton.disabled = true;
  }

  countdown = setInterval(updateTimer, 1000);
  stopButton.disabled=false;
  resetButton.disabled = false;


}

function stopTimer() {
  clearInterval(countdown);
  startButton.disabled = false;
}

function resetTimer() {
  clearInterval(countdown);
  totalTime = 0;
  currentTime = 0;
  hours.value = "0";
  minutes.value = "0";
  seconds.value = "0";
  updateTimerDisplay();
  progressBar.style.width = "0";
  percentVal.innerHTML = '';
  startButton.disabled = false;
}

function updateTimer() {
  if (currentTime > 0) {
    currentTime--;
    updateTimerDisplay();
    updateProgressBar();
  } else {
    clearInterval(countdown);
  }
}

function updateTimerDisplay() {
  const hours = Math.floor(currentTime / 3600);
  const minutes = Math.floor((currentTime % 3600) / 60);
  const seconds = currentTime % 60;

  timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateProgressBar() {
  const percentage = ((totalTime - currentTime) / totalTime) * 100;
  progressBar.style.width = percentage + "%";
  if (percentage <= 100) {
    percentVal.innerHTML = Math.floor(percentage) + "%";
  }

}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);