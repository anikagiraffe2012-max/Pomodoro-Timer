const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workModeBtn = document.getElementById('workModeBtn');
const breakModeBtn = document.getElementById('breakModeBtn');
const progressBar = document.getElementById('progressBar');

let timerInterval = null;
let currentMode = 'work';
let timeLeft = 25 * 60;
let totalTime = 25 * 60;

function updateDisplay () {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesSpan.textContent = minutes;
    secondsSpan.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function updateProgress() {
    const percent = (timeLeft / totalTime) * 100;
    progressBar.style.width = percent + '%'
}

function setMode(mode) {
    currentMode = mode;
    if (mode === 'work') {
        totalTime = 25 * 60;
        timeLeft = totalTime;
    } else {
        totalTime = 5 * 60;
        timeLeft = totalTime;
    }
    updateDisplay();
    updateProgress();
}

function startTimer() {
    if (timerInterval !== null) return;
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert(`Time's up! ${currentMode === 'work' ? 'Take a break!' : 'Back to work!'}`);

            if (currentMode === 'work') {
                setMode('break');
            } else {
                setMode('work');
            }
        } else {
            timeLeft = timeLeft - 1;
            updateDisplay();
            updateProgress();
        }
    }, 1000);
}
function pauseTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    pauseTimer();

    if (currentMode === 'work') {
        timeLeft = 25 * 60;
        totalTime = 25 * 60;
    } else {
        timeLeft = 5 * 60;
        totalTime = 5 * 60;
    }
    updateDisplay();
    updateProgress();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
workModeBtn.addEventListener('click', () => {
    pauseTimer();
    setMode('work');
});
breakModeBtn.addEventListener('click', () => {
    pauseTimer();
    setMode('break');
});

setMode('work');