let timeLeft = 1500; // 25 minutes in seconds
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
  
  // Update document title with timer
  document.title = `${minutesDisplay.textContent}:${secondsDisplay.textContent} - Pomodoro Timer`;
}

function startTimer() {
  if (isRunning) {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    startBtn.classList.remove('running');
    return;
  }

  isRunning = true;
  startBtn.textContent = 'Pause';
  startBtn.classList.add('running');

  timerId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerId);
      isRunning = false;
      startBtn.textContent = 'Start';
      startBtn.classList.remove('running');
      alert('Time is up!');
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerId);
  isRunning = false;
  startBtn.textContent = 'Start';
  startBtn.classList.remove('running');
  
  const activeBtn = document.querySelector('.mode-btn.active');
  timeLeft = parseInt(activeBtn.dataset.time);
  updateDisplay();
}

modeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    modeButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    startBtn.classList.remove('running');
    
    timeLeft = parseInt(e.target.dataset.time);
    updateDisplay();
  });
});

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial call
updateDisplay();