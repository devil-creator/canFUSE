const editor = document.getElementById('editor');
const keys = document.querySelectorAll(".key");
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const clearButton = document.getElementById('clearButton');
let isMoving = false; // Flag to check if keys are moving

// Initial setup to arrange keys in keyboard layout
function arrangeKeys() {
    const keyRows = document.querySelectorAll('.key-row');
    keyRows.forEach((row, rowIndex) => {
        const keysInRow = row.children;
        Array.from(keysInRow).forEach((key, keyIndex) => {
            const keyWidth = key.offsetWidth;
            const keyHeight = key.offsetHeight;

            // Position keys in a grid layout
            key.style.position = 'absolute';
            key.style.left = `${keyIndex * (keyWidth + 5)}px`; // 5px margin between keys
            key.style.top = `${rowIndex * (keyHeight + 5)}px`; // 5px margin between rows
        });
    });
}

// Call the function to arrange keys initially
arrangeKeys();

// Save the text to local storage
saveButton.addEventListener('click', () => {
    localStorage.setItem('savedText', editor.value);
    alert("Text saved successfully!");
});

// Load the text from local storage and start moving keys
loadButton.addEventListener('click', () => {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
        editor.value = savedText; // Load the saved text into the editor canvas
    } else {
        alert("No text found to load.");
    }
    if (!isMoving) {
        isMoving = true; // Start moving keys on load
        moveKeys();
    }
});

// Clear the text editor
clearButton.addEventListener('click', () => {
    editor.value = '';
});

// Add click event listener to each key
keys.forEach(key => {
    key.addEventListener("click", () => {
        editor.value += key.innerText; // Append key value to the textarea
        if (!isMoving) {
            isMoving = true; // Start moving keys after the first click
            moveKeys();
        }
    });
});

// Function to set a random position for each key within the keyboard container
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

// Function to move all keys randomly within the keyboard container
function moveKeys() {
    keys.forEach(key => {
        setRandomPosition(key);
    });
    setTimeout(moveKeys, 2000); // Move keys every 2 seconds
}
