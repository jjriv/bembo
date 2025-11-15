// alphabet.js - a list of letters and their animals
const alphabet = {
    //list all the letters of the alpabet with their corresponding animal name
    a: "Antelope",
    b: "Bison",
    c: "Crab",
    d: "Dragon",
    e: "Elephant",
    f: "Flamingo",
    g: "Giraffe",
    h: "Hippopotamus",
    i: "Ibis/Iguana",
    j: "Jaguar",
    k: "Koala",
    l: "Lobster/Lion",
    m: "Monkey",
    n: "Narhwal/Newt",
    o: "Owl/Octopus",
    p: "Peacock/Pig",
    q: "Quail",
    r: "Rhinoceros",
    s: "Salmon/Scallop",
    t: "Turtle",
    u: "Unicorn",
    v: "Viper",
    w: "Wolf",
    x: "X-ray Wolf",
    y: "Yak",
    z: "Zebra"
};

//loop through the alphabet and insert a div that contains the letter and animal name
//append these divs to the alphabet div in index.html
function createAlphabetDisplay() {
    const alphabetDiv = document.getElementById('alphabet');
    for (const [letter, animal] of Object.entries(alphabet)) {
        const div = document.createElement('div');
        div.className = 'letter-animal';
        div.innerHTML = `<h2 class="letter">${letter.toUpperCase()}</h2><h3 class="animal-name">${animal}</h3>`;
        
        // Add click event listener
        div.addEventListener('click', () => {
            window.location.href = `index.html?letter=${letter}`;
        });
        
        alphabetDiv.appendChild(div);
    }
}

// Call the function to create the display on page load
// Run on page load
window.addEventListener('DOMContentLoaded', function() {
    createAlphabetDisplay();
});
