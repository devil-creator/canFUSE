// Get DOM elements
const editor = document.getElementById('editor');
const keys = document.querySelectorAll(".key");
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const clearButton = document.getElementById('clearButton');
const generatedTextElement = document.getElementById('generatedText');
const timer = document.getElementById('timer');
const currentTimeElement = document.getElementById('currentTime'); // To display the current time
const backspaceButton = document.getElementById('backspaceButton'); // Backspace button element

let isMoving = false;          // To track if keys are moving
let timerInterval;             // Timer interval reference
let startTime;                 // Start time for the timer

// Function to generate a random sentence
function generateRandomSentence() {
    const words = [
        "the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog",
        "and", "the", "rain", "in", "Spain", "stays", "mainly", "in", "the", "plain",
        "to", "be", "or", "not", "to", "be", "that", "is", "the", "question",
        "hello", "world", "programming", "javascript", "keyboard", "game", "fun", "learning"
    ];
    const sentence = Array.from({ length: 20 }, () => 
        words[Math.floor(Math.random() * words.length)]
    );
    return sentence.join(" ");
}

// Set up the text box with a generated sentence
function setupTextBox() {
    const generatedText = generateRandomSentence();
    generatedTextElement.innerText = generatedText; // Display the generated text
    editor.value = ""; // Clear the editor

    // Reset timer display
    startTime = new Date();
    timer.innerText = `Time: 0s`;
    clearInterval(timerInterval); // Clear any existing timer

    // Start timer update loop
    timerInterval = setInterval(updateTimer, 1000);
}

// Update timer display every second
function updateTimer() {
    const elapsed = new Date() - startTime;
    const seconds = Math.floor(elapsed / 1000);
    timer.innerText = `Time: ${seconds}s`;
}

// Stop timer when the user matches the generated text
editor.addEventListener("input", () => {
    if (editor.value.trim() === generatedTextElement.innerText) {
        clearInterval(timerInterval);
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        alert(`You matched the generated text! Time taken: ${elapsed} seconds`);
        currentTimeElement.innerText = `Your time: ${elapsed} seconds`; // Show current time
    }
});

// Prevent physical keyboard input
editor.addEventListener('keydown', (event) => {
    event.preventDefault(); // Disable all key events on the editor
});

// Arrange keys in the keyboard layout
function arrangeKeys() {
    const keyRows = document.querySelectorAll('.key-row');
    keyRows.forEach((row, rowIndex) => {
        const keysInRow = row.children;
        Array.from(keysInRow).forEach((key, keyIndex) => {
            key.style.position = 'absolute';
            key.style.left = `${keyIndex * (key.offsetWidth + 5)}px`; // Margin between keys
            key.style.top = `${rowIndex * (key.offsetHeight + 5)}px`; // Margin between rows
        });
    });
}

// Set a random position for each key within the keyboard container
function setRandomPosition(key) {
    const keyboard = document.getElementById('keyboard');
    const keyboardRect = keyboard.getBoundingClientRect();
    const keyWidth = key.offsetWidth;
    const keyHeight = key.offsetHeight;

    const x = Math.random() * (keyboardRect.width - keyWidth);
    const y = Math.random() * (keyboardRect.height - keyHeight - 30); // Adjust for header space
    key.style.position = "absolute"; // Set absolute positioning for movement
    key.style.left = `${x}px`;
    key.style.top = `${y}px`;
}

// Move all keys randomly within the keyboard container
function moveKeys() {
    keys.forEach(setRandomPosition);
    setTimeout(moveKeys, 2000); // Move keys every 2 seconds
}

// Arrange keys on page load
arrangeKeys();

// Save the text to local storage
saveButton.addEventListener('click', () => {
    localStorage.setItem('savedText', editor.value);
    alert("Text saved successfully!");
});

// Load the saved text from local storage
loadButton.addEventListener('click', () => {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
        editor.value = savedText;
    } else {
        alert("No saved text found.");
    }
});

// Clear the text editor
clearButton.addEventListener('click', () => {
    editor.value = '';
});

// Handle key clicks
keys.forEach(key => {
    key.addEventListener("click", () => {
        editor.value += key.innerText; // Append key value to the editor
        if (!isMoving) {
            isMoving = true; // Start moving keys after the first click
            moveKeys();
        }
    });
});

// Backspace functionality to delete the last character
backspaceButton.addEventListener('click', () => {
    editor.value = editor.value.slice(0, -1); // Remove the last character from the editor
});

// Call setupTextBox on page load
window.onload = setupTextBox;
