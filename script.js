const NUM_INSTRUMENTS = 4;
const NUM_BEATS = 16;
let isPlaying = false;
let currentBeat = 0;
let intervalId;

// Load audio samples
const sounds = {
    kick: new Audio('sounds/kick.wav'),
    snare: new Audio('sounds/snare.wav'),
    hihat: new Audio('sounds/hihat.wav'),
    clap: new Audio('sounds/clap.wav')
};

// Create grid and add event listeners
const instrumentIds = ['kick', 'snare', 'hihat', 'clap'];
const grid = {};

instrumentIds.forEach((instrumentId, rowIndex) => {
    const row = document.getElementById(`${instrumentId}-row`);
    grid[instrumentId] = [];

    for (let beatIndex = 0; beatIndex < NUM_BEATS; beatIndex++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => toggleCell(instrumentId, beatIndex));
        row.appendChild(cell);
        grid[instrumentId].push(cell);
    }
});

// Toggle cell on/off
function toggleCell(instrumentId, beatIndex) {
    grid[instrumentId][beatIndex].classList.toggle('active');
}

// Play the loop
function playLoop() {
    currentBeat = 0;
    intervalId = setInterval(() => {
        playCurrentBeat();
        currentBeat = (currentBeat + 1) % NUM_BEATS;
    }, 300); // Adjust the tempo as needed
}

// Stop the loop
function stopLoop() {
    clearInterval(intervalId);
    clearCurrentBeatHighlights();
}

// Play sounds for the current beat
function playCurrentBeat() {
    clearCurrentBeatHighlights();

    instrumentIds.forEach(instrumentId => {
        const cell = grid[instrumentId][currentBeat];
        cell.classList.add('highlight');

        if (cell.classList.contains('active')) {
            sounds[instrumentId].currentTime = 0;
            sounds[instrumentId].play();
        }
    });
}

// Clear highlights from previous beat
function clearCurrentBeatHighlights() {
    instrumentIds.forEach(instrumentId => {
        grid[instrumentId][currentBeat].classList.remove('highlight');
    });
}

// Toggle loop playback
document.getElementById('toggleLoop').addEventListener('click', () => {
    isPlaying = !isPlaying;
    document.getElementById('toggleLoop').innerText = isPlaying ? 'Stop Loop' : 'Start Loop';
    if (isPlaying) {
        playLoop();
    } else {
        stopLoop();
    }
});
