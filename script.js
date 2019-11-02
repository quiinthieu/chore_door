const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');

const startButton = document.getElementById('start');

const currentStreak = document.getElementById('score-number');
const bestStreak = document.getElementById('high-score-number');
let score = 0, highScore = 0;
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

let numClosedDoors = 3;
let openDoor1, openDoor2, openDoor3;
let currentlyPlaying = true;

// MVP - If/Else Generator (3 possible combinations)
/* const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    switch (choreDoor) {
        case 0: openDoor1 = botDoorPath; openDoor2 = beachDoorPath; openDoor3 = spaceDoorPath; break;
        case 1: openDoor2 = botDoorPath; openDoor1 = beachDoorPath; openDoor3 = spaceDoorPath; break;
        case 2: openDoor3 = botDoorPath; openDoor1 = beachDoorPath; openDoor2 = spaceDoorPath;
    }
}; */

const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * 6);
    switch (choreDoor) {
        case 0:
            openDoor1 = botDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 1:
            openDoor1 = botDoorPath;
            openDoor2 = spaceDoorPath;
            openDoor3 = beachDoorPath;
            break;
        case 2:
            openDoor2 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 3:
            openDoor2 = botDoorPath;
            openDoor1 = spaceDoorPath;
            openDoor3 = beachDoorPath;
            break;
        case 4:
            openDoor3 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor2 = spaceDoorPath;
            break;
        case 5:
            openDoor3 = botDoorPath;
            openDoor1 = spaceDoorPath;
            openDoor2 = beachDoorPath;
            break;
    }
}

const isBot = door => {
    return door.src === botDoorPath;
}
const isClicked = door => {
    return door.src != closedDoorPath;
};

const getYourScore = () => {
    score++;
    currentStreak.innerHTML = score;
    if (score > highScore) {
        highScore = score;
        bestStreak.innerHTML = highScore;
    }
};

const gameOver = status => {
    switch (status) {
        case 'win': startButton.innerHTML = 'You win! Play again?'; getYourScore(); break;
        default: startButton.innerHTML = 'Game over! Play again?'; score = 0; currentStreak.innerHTML = score;
    }
    currentlyPlaying = false;
};

const playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    }
    else if (isBot(door)) {
        gameOver();
    }
};

doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
};

doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
};

doorImage3.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage3)) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
};

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

startButton.onclick = () => {
    if (!currentlyPlaying) {
        startRound();
    }
};
startRound();