let workoutDuration = 20; // workout time in seconds
let restDuration = 20; // rest time in seconds
let currentTimer = 0;
let totalWorkTime = 0; // total workout time counter
let isWorkout = true;
let interval;

const workoutTimerElement = document.getElementById('workout-timer');
const restTimerElement = document.getElementById('rest-timer');
const totalWorkTimeElement = document.getElementById('total-work-time');
const bodyElement = document.body;

let countdownDuration = 10; // 10 seconds countdown
const countdownTimerElement = document.getElementById('countdown-timer');
const countdownContainer = document.getElementById('countdown-container');

document.getElementById('start').addEventListener('click', function() {
    countdownContainer.style.display = 'flex'; // Show the countdown
    startCountdown();
});

document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

function startCountdown() {
    let countdown = countdownDuration;
    countdownTimerElement.textContent = countdown;
    let countdownInterval = setInterval(function() {
        countdown--;
        countdownTimerElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownContainer.style.display = 'none'; // Hide the countdown
            startWorkoutTimer();
        }
    }, 1000);
}

function startWorkoutTimer() {
    if (!interval) {
        isWorkout = true;
        currentTimer = workoutDuration;
        interval = setInterval(timerLogic, 1000);
    }
}

function updateDisplay() {
    workoutTimerElement.textContent = isWorkout ? formatTime(currentTimer) : '00:00';
    restTimerElement.textContent = !isWorkout ? formatTime(currentTimer) : '00:00';
    totalWorkTimeElement.textContent = `Total Work: ${formatTime(totalWorkTime)}`;
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function timerLogic() {
    if (currentTimer > 0) {
        currentTimer--;
        if (isWorkout) {
            totalWorkTime++;
        }
    } else {
        isWorkout = !isWorkout;
        currentTimer = isWorkout ? workoutDuration : restDuration;
        bodyElement.className = isWorkout ? 'work-state' : 'rest-state';
    }
    updateDisplay();
}


function pauseTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    pauseTimer();
    currentTimer = 0;
    isWorkout = true;
    totalWorkTime = 0;
    updateDisplay();
}

updateDisplay();
