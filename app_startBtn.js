//the sound a free sound from mixkit  https://mixkit.co/free-sound-effects/bell/ 

/*
-Using the Audio() constructor to aassign the path of the bell sound as a parameter.
-For the startBtn and session constant variables, we are using the document object's .querySelector() method to select and update elements on the web page through the classes .btn-start and .minutes
-Instantiating a myInterval
-The last variable is a state that is assigned the Boolean value True. This defines when the application is running. If it is, the timer will progress. However, if the state is false, there will be an alert that notifies the user that the session has already started.*/

const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const session = document.querySelector('.minutes');
let myInterval;
let state = true;

/*
-declairing the function appTimer():
    >grabbing the text "25" in the session variable, converting it to a Number and assigning that number to sessionAmount
    >if state is true:
        ->Convert the sessionAmount, the time left, to just seconds.
        ->Define a function called updateSeconds()
        ->Use the setInverval() Web API function to run our updateSeconds() function every 1 second (or 1000 milliseconds). This is assigned to our myInterval function from earlier, so it can be turned off when the timer reaches 0.
    >if state is false:
        -> alert the user that the "Session has already started". This prevents the user from repeatedly clicking on the start button which would cause multiple calls to the updateSeconds() function and would cause the timer to count at an irregular speed.*/

const appTimer = () => {
    console.log('Function appTimer  started');
    const sessionAmount = Number.parseInt(session.textContent);

    if (state){
        state = false;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            //define two div-elements called minuteDiv and secondDiv, change the text content that is being displayed on the page as the timer counts down to zero
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds -- ;
            let minutesLeft = Math.floor(totalSeconds/60);
            //use the % modulo operator to ensure that the secondsLeft variable is a positive integer between 0 and 59, inclusive
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10){
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (minutesLeft === 0 && secondsLeft === 0) {
                bells.play();
                clearInterval(myInterval);
            }

        }
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.');
    }
}

startBtn.addEventListener('click', appTimer);