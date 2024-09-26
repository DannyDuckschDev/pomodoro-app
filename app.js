// This JavaScript code implements a simple Pomodoro timer with start, pause, and reset functionalities. 
// It uses the Web Audio API to play a sound when the timer finishes.

// Load the bell sound
const bells = new Audio('./sounds/bell.wav');

// Get references to the HTML elements for the start button, the session display and status message
const startBtn = document.querySelector('.btn-start');
const session = document.querySelector('.minutes');
const statusMessage = document.querySelector('.status-message');

// Initialize variables for the timer and state management
let myInterval;
let state = true;
let totalSeconds;

// Initialize 

// Initialize variables for the pause button
const pauseBtn = document.querySelector('.btn-pause');
let isPaused = false;

// Initialize variables for the reset button
const resetBtn = document.querySelector('.btn-reset');

// Store the original session value for resetting
const originalSessionValue = session.textContent;

// Function to update the timer display every second
const updateSeconds = () => {
    // Get references to the minute and second display elements
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');

    // Decrement the total seconds left
    totalSeconds--;

    // Calculate the remaining minutes and seconds
    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    // Format the seconds display to always show two digits
    if (secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
    } else {
        secondDiv.textContent = secondsLeft;
    }

    // Update the minutes display
    minuteDiv.textContent = `${minutesLeft}`;

    // Check if the timer has reached zero
    if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
    }
};

// Function to start the timer
const appTimer = () => {
    // Get the initial session amount in minutes
    const sessionAmount = Number.parseInt(session.textContent);

    // Start the timer only if it hasn't started and is not paused
    if (state && !isPaused) {
        state = false;
        totalSeconds = sessionAmount * 60;
        updateSeconds();
        myInterval = setInterval(updateSeconds, 1000);
    } else if (state && isPaused) {
        // Timer is already counting down, do nothing
    } else if (!state) {
        alert('Session has already started.');
    }
};

// Function to pause or resume the timer
const pauseTimer = () => {
    // Do nothing if the timer has not started
    if (state) {
        alert('Please start the timer first.')
        return;
    }

    if (isPaused) {
        // Resume the timer, set text to 'Pause', clear status message
        isPaused = false;
        myInterval = setInterval(updateSeconds, 1000);
        pauseBtn.textContent = 'Pause';
        statusMessage.textContent = '';
    } else {
        // Pause the timer, set text to 'Resume', show status message
        isPaused = true;
        clearInterval(myInterval);
        pauseBtn.textContent = 'Resume';
        statusMessage.textContent = 'Timer paused';
    }
};

// Function to reset the timer
const resetTimer = () => {
    // Stop the interval
    clearInterval(myInterval);

    // Reset the state and variables
    state = true;
    isPaused = false;
    pauseBtn.textContent = 'Pause';
    statusMessage.textContent = '';
    session.textContent = originalSessionValue;
    totalSeconds = Number.parseInt(session.textContent) * 60;

    // Reset the display
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');
    minuteDiv.textContent = session.textContent;
    secondDiv.textContent = '00';
};

// Add event listeners for the start, pause, and reset buttons
startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
