//DOM definitions
let userInput = document.getElementById("typingInput"); //User text input
let p = document.getElementById("testBox"); //Text display to user
let count = document.getElementById("gameCount"); //User's score
let percent = document.getElementById("percentage"); //User's percentage
let startButton = document.getElementById("start"); //Game run button
let restartButton = document.getElementById("restart"); //Game reset button
let correctWords = document.getElementById("correctWords"); //Correct words container
let incorrectWords = document.getElementById("incorrectWords"); //Incorrect words container
let adjCheck = document.getElementById("adjsBox");
let nounCheck = document.getElementById("nounsBox");
let verbCheck = document.getElementById("verbsBox");

//Counters
let total = 0; //Player correct score
let counter = 0; //Times game has been run

//All data regarding the words to be used
let correctWordsArray = [];
let incorrectWordsArray = [];
const wordsObj = new Object();
    wordsObj.adjectives = ["Delightful", "Alive", "Annoyed", "Fair", "Terrible", "Damp", "Cool", "Dry", "Warm", "Cold", "Large", "Thin", "Great", "Rapid", "Kind", "Defiant"];
    wordsObj.nouns = ["People", "Meat", "Data", "Food", "Internet", "Idea", "World", "Year", "Bird", "Software", "Area", "Player", "Video", "Paper", "Failure", "Success"];
    wordsObj.verbs = ["Appear", "Avoid", "Crawl", "Dare", "Give", "Laugh", "Create", "Spend", "Open", "Win", "Remember", "Die", "Fall", "Cut", "Report", "Decide", "Reach"];
let wordArr = [];

function checkType () {
    word = correctWordsArray.toString().split(",").pop();
    let adjString = wordsObj.adjectives.toString().split(",").join(" ");
    let nounString = wordsObj.nouns.toString().split(",").join(" ");
    let verbString = wordsObj.verbs.toString().split(",").join(" ");

    if (adjString.includes(word)) {
        return "testDiv testDiv-adj"
    };

    if (nounString.includes(word)) {
        return "testDiv testDiv-noun"
    }

    if (verbString.includes(word)) {
        return "testDiv testDiv-verb"
    }

};

function addPill (pillName, location, nameClass) {

    let newDiv = document.createElement("div");
    let newContent = document.createTextNode(pillName);
    newDiv.appendChild(newContent);
    newDiv.className = nameClass;

    let currentDiv = document.getElementById(location);
    currentDiv.insertAdjacentElement("beforeend", newDiv);
};

function clearData() {
    correctWordsArray = [];
    incorrectWordsArray = [];
    correctWords.innerText = "";
    incorrectWords.innerText = "";
    total = 0;
    counter = 0;
    count.innerText = "0 / 0";
    percent.innerText = "0 %";
    document.getElementById("correctCount").innerHTML = "Correct Words (" + total + ")" + "<hr>";
    document.getElementById("incorrectCount").innerHTML = "Incorrect Words (" + incorrectWordsArray.length + ")" + "<hr>";
    userInput.value = "";
    userInput.style.borderStyle = "hidden";
};

//Generates the array of words to be shown to user
function generateArray() { 

    wordArr = []; //Empties Array to be repopulated

    if (adjCheck.checked === true) {
        wordArr.push(wordsObj.adjectives);
    };
    if (nounCheck.checked === true) {
        wordArr.push(wordsObj.nouns);
    };
    if (verbCheck.checked === true) {
        wordArr.push(wordsObj.verbs);
    };

    wordArr = [].concat(...wordArr); //Flattens multidimensional array
    
};
function allUnchecked() {
    if (adjCheck.checked === true || nounCheck.checked === true || verbCheck.checked === true) {

       return false
   
    }else {

        return true
    };
};

adjCheck.addEventListener("change", function() { 
    allUnchecked();
    if(allUnchecked() === false) {
        generateArray();
        p.innerText = generateWord();
    } else if (allUnchecked() === true) {
        adjCheck.checked = true;
    };
});

nounCheck.addEventListener("change", function() {
    allUnchecked();
    if(allUnchecked() === false) {
        generateArray();
        p.innerText = generateWord();
    } else if (allUnchecked() === true) {
        nounCheck.checked = true;
    };
});

verbCheck.addEventListener("change", function() {
    allUnchecked();
    if(allUnchecked() === false) {
        generateArray();
        p.innerText = generateWord();
    } else if (allUnchecked() === true) {
        verbCheck.checked = true;
    };
});


//Generates a random word from wordArr
function generateWord() {

    return wordArr[Math.floor(Math.random() * wordArr.length)];
};

//Calculates percentage score
function generatePercentage(score, questions) {

    return (score / questions) * 100;
};

//Handles all necessary processes for each iteration
function gameRun () {

    counter += 1;

    //If correct
    if (p.innerText.toLowerCase().trim() === userInput.value.toLowerCase().trim()) {
        total += 1;
        correctWordsArray.push(p.innerText);

        
        addPill(correctWordsArray.toString().split(",").pop(), "correctWords", checkType());
        
    //If incorrect
    } else {
        userInput.style.borderStyle = "solid";
        incorrectWordsArray.push(userInput.value);
        addPill((incorrectWordsArray.toString().split(",").pop()), "incorrectWords", "testDiv");
    }; 

    count.innerText = total + " / " + counter;
    percentage.innerText = Math.trunc(generatePercentage(total, counter)) + " %";
    document.getElementById("correctCount").innerHTML = "Correct Words (" + total + ")" + "<hr>";
    document.getElementById("incorrectCount").innerHTML = "Incorrect Words (" + incorrectWordsArray.length + ")" + "<hr>";
    //correctWords.innerText = correctWordsArray.toString().split(",").join(" ");
    //incorrectWords.innerText = incorrectWordsArray.toString().split(",").join(" ");
};



//Waiting for [Space] input
userInput.addEventListener('keydown', event => {

    if (event.keyCode === 32) {
        userInput.style.borderStyle = "hidden";

        if (userInput.value.trim() !== "") {
            gameRun();
            userInput.value = "";
            p.innerText = generateWord();

        } else {
            userInput.style.borderStyle = "solid";
            userInput.style.borderColor = "orange";
            userInput.value = null;
        };

    };
});

//Initiates game start
startButton.addEventListener("click", event => {
    generateArray();
    p.innerText = generateWord();
    startButton.hidden = true;
    restartButton.hidden = false;
});

//Resets game environment with any changes made
restartButton.addEventListener("click", event => {
    generateArray();
    p.innerText = generateWord();
    clearData();
});

