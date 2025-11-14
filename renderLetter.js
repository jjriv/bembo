// renderLetter.js - Function to render letter elements
// Ensures a global letterData map exists for letter script files to populate
window.letterData = window.letterData || {};

// Dynamically load a letter definition script like letters/a.js
function loadLetterConfig(letter) {
    return new Promise((resolve, reject) => {
        const l = (letter || '').toLowerCase();
        if (!l.match(/^[a-z]$/)) {
            reject(new Error(`Invalid letter: ${letter}`));
            return;
        }
        // If it's already loaded, resolve immediately
        if (window.letterData && window.letterData[l]) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = `letters/${l}.js`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load config: ${script.src}`));
        document.head.appendChild(script);
    });
}
function renderLetter(letter) {
    const data = letterData[letter.toLowerCase()];
    
    if (!data) {
        console.error(`No data found for letter: ${letter}`);
        return;
    }
    
    // Set page background color 
    document.body.style.backgroundColor = data.backgroundColor;
    
    // Create animal name h1
    const animalName = document.createElement('h1');
    animalName.className = 'animal-name';
    animalName.textContent = data.animalName.text;
    if (data.animalName.left) animalName.style.left = data.animalName.left;
    if (data.animalName.right) animalName.style.right = data.animalName.right;
    if (data.animalName.top) animalName.style.top = data.animalName.top;
    if (data.animalName.bottom) animalName.style.bottom = data.animalName.bottom;
    animalName.style.color = data.animalName.color;
    animalName.style.fontSize = data.animalName.fontSize;
    document.body.appendChild(animalName);
    
    // Create animal letter h2 (if defined)
    if (data.animalLetter) {
        const animalLetter = document.createElement('h2');
        animalLetter.className = 'animal-letter';
        animalLetter.textContent = data.animalLetter.text;
        if (data.animalLetter.left) animalLetter.style.left = data.animalLetter.left;
        if (data.animalLetter.right) animalLetter.style.right = data.animalLetter.right;
        if (data.animalLetter.top) animalLetter.style.top = data.animalLetter.top;
        if (data.animalLetter.bottom) animalLetter.style.bottom = data.animalLetter.bottom;
        animalLetter.style.color = data.animalLetter.color;
        animalLetter.style.fontSize = data.animalLetter.fontSize;
        document.body.appendChild(animalLetter);
    }
    
    // Create additional div if defined
    if (data.additionalDiv) {
        const div = document.createElement('div');
        div.className = 'partial-background';
        
        // Apply all style properties from the config
        if (data.additionalDiv.top) div.style.top = data.additionalDiv.top;
        if (data.additionalDiv.right) div.style.right = data.additionalDiv.right;
        if (data.additionalDiv.left) div.style.left = data.additionalDiv.left;
        if (data.additionalDiv.bottom) div.style.bottom = data.additionalDiv.bottom;
        if (data.additionalDiv.width) div.style.width = data.additionalDiv.width;
        if (data.additionalDiv.height) div.style.height = data.additionalDiv.height;
        if (data.additionalDiv.backgroundColor) div.style.backgroundColor = data.additionalDiv.backgroundColor;
        if (data.additionalDiv.zIndex) div.style.zIndex = data.additionalDiv.zIndex;
        
        document.body.appendChild(div);
    }
    
    // Create animal container
    const container = document.createElement('div');
    container.className = 'animal-container';
    container.style.setProperty('--scale', data.animalContainer.scale);
    container.style.left = data.animalContainer.left;
    container.style.top = data.animalContainer.top;
    
    // Create letter divs inside container
    data.letters.forEach(letterConfig => {
        const letterDiv = document.createElement('div');
        letterDiv.textContent = letterConfig.text;
        letterDiv.style.left = `calc(${letterConfig.left} * var(--scale))`;
        letterDiv.style.top = `calc(${letterConfig.top} * var(--scale))`;
        letterDiv.style.fontSize = `calc(${letterConfig.fontSize} * var(--scale))`;
        letterDiv.style.color = letterConfig.color;
        if (letterConfig.rotate) {
            letterDiv.style.transform = `rotate(${letterConfig.rotate})`;
        }
        if (letterConfig.scalex) {
            letterDiv.style.transform += ` scaleX(${letterConfig.scalex})`;
        }
        container.appendChild(letterDiv);
    });
    
    document.body.appendChild(container);
}

// Run on page load
window.addEventListener('DOMContentLoaded', function() {
    // Get the letter from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const letter = urlParams.get('letter');
    if (letter) {
        loadLetterConfig(letter)
            .then(() => {
                // Hide the title page only after successful load
                const titlePage = document.getElementById('title-page');
                if (titlePage) titlePage.style.display = 'none';
                renderLetter(letter);
            })
            .catch((err) => {
                console.error(err);
            });
    }
});