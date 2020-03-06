//DOM definitions
let userInput = document.getElementById("typingInput"); //User text input
let p = document.getElementById("testBox"); //First word to display to user
let p2 = document.getElementById("secondWord");
let p3 = document.getElementById("thirdWord");
let count = document.getElementById("gameCount"); //User's score
let percent = document.getElementById("percentage"); //User's percentage
let startButton = document.getElementById("start"); //Game run button
let restartButton = document.getElementById("restart"); //Game reset button
let correctWords = document.getElementById("correctWords"); //Correct words container
let incorrectWords = document.getElementById("incorrectWords"); //Incorrect words container
let adjCheck = document.getElementById("adjsBox"); //Adjectives checkbox
let nounCheck = document.getElementById("nounsBox"); //Nouns checkbox
let verbCheck = document.getElementById("verbsBox"); //Verbs checkbox
let slider = document.getElementById("lengthRange"); //Slider for length
let sliderDisplay = document.getElementById("sliderValue"); //Display for current slider value
let lenCount = 0;
//Counters
let total = 0; //Player correct score
let counter = 0; //Times game has been run

//All data regarding the words to be used
let correctWordsArray = [];
let incorrectWordsArray = [];
const wordsObj = extWords; //extWords is from the external js file that is loaded in "words.js"
const numObj = numPad; //numPad is from the external js file that is loaded in "words.js"
let wordArr = [];

//Generates the array of words to be shown to user
function generateArray() { 

    wordArr = []; //Empties Array to be repopulated
    let tempWordArr = [];



    if (adjCheck.checked === true) {
        wordArr.push(wordsObj.adjectives);
    };

    if (nounCheck.checked === true) {
        wordArr.push(wordsObj.nouns);
    };

    if (verbCheck.checked === true) {
        wordArr.push(wordsObj.verbs);
    };

    tempWordArr = [].concat(...wordArr); //Flattens multidimensional array
    wordArr = tempWordArr;

    getLengthRange();
    wordArr = tempWordArr.filter(word => word.length <= slider.value);


};

function getLengthRange() {


    //generateArray();
/*     for(let i=0; i < wordArr.length; i++){
        if(i === 0 || wordArr[i].length >= slider.max){
           slider.max = wordArr[i].length;
        }

        if(wordArr.length > 0 && wordArr[i].length < slider.min){
            slider.min = wordArr[i].length;
        }     
    }; */

    
    
    /* sliderDisplay.innerText = `Max Length: ${slider.value}`;
    console.log(lenCount); */
 
    slider.max = Math.max(...(wordArr.map(el => el.length)));
    slider.min = Math.min(...(wordArr.map(el => el.length)));
    console.log(slider.value);
    sliderDisplay.innerText = `Max Length: ${slider.value}`;
}; 



generateArray();
//sliderDisplay.innerText = `Max Length: ${slider.value}`;

//Determines which word type it is and returns the CSS class
function checkType () {

    word = correctWordsArray.toString().split(",").pop();
    let adjString = wordsObj.adjectives;
    let nounString = wordsObj.nouns;
    let verbString = wordsObj.verbs;


    if (adjString.includes(word)) {
        return "wordPill wordPill-adj";
    };

    if (nounString.includes(word)) {
        return "wordPill wordPill-noun";
    };

    if (verbString.includes(word)) {
        return "wordPill wordPill-verb";
    };

};

function addPill (pillName, location, nameClass) {

    let newDiv = document.createElement("div"); //Specifies it is a div being created
    let newContent = document.createTextNode(pillName); //The text within the div
    let currentDiv = document.getElementById(location); //Where the div will be created

    newDiv.appendChild(newContent); //Creates the div
    newDiv.className = nameClass; //Gives it a class
    currentDiv.insertAdjacentElement("beforeend", newDiv); //Inserts the div at the end of the 'list'

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



//Function can be called to check the state of the modifier checkboxes.
function allUnchecked() {

    if (adjCheck.checked === true || nounCheck.checked === true || verbCheck.checked === true) {
       return false;
        //More than 1 box checked
    }else {
        return true;
        //Only 1 box checked
    };
};

//Event listening for adjectives checkbox being changed
adjCheck.addEventListener("change", function() { 

    checkEvent(adjCheck);
});

//Event listening for nouns checkbox being changed
nounCheck.addEventListener("change", function() {
    checkEvent(nounCheck);
});

//Event listening for verbs checkbox being changed
verbCheck.addEventListener("change", function() {
    checkEvent(verbCheck)

});

function checkEvent(boxName) {

    if(allUnchecked() === false && startButton.hidden === true) {
        generateArray();
        p.innerText = generateWord();
        slider.value = slider.min;
        sliderDisplay.innerText = `Max Length: ${slider.value}`;
        
    } else if (allUnchecked() === true) {
        boxName.checked = true;
    };
}
//Generates a random word from wordArr
function generateWord() {
    
    if (total === 0) {
        p2.hidden = false;
        p3.hidden = false;
        p.innerText = wordArr[Math.floor(Math.random() * wordArr.length)];
        p2.innerText = wordArr[Math.floor(Math.random() * wordArr.length)];
        p3.innerText = wordArr[Math.floor(Math.random() * wordArr.length)];
    } else {
        p.innerText = p2.innerText
        p2.innerText = p3.innerText
        p3.innerText = wordArr[Math.floor(Math.random() * wordArr.length)];
    }

    return wordArr[Math.floor(Math.random() * wordArr.length)];
};

//Calculates percentage score
function generatePercentage(score, questions) {

    return (score / questions) * 100;
};

//Handles all necessary processes for each iteration
function gameRun () {

    counter += 1; //Total times game has been run

    //If correct
    if (p.innerText.toLowerCase().trim() === userInput.value.toLowerCase().trim()) {
        total += 1; //'Score' increases
        correctWordsArray.push(p.innerText);
        addPill(correctWordsArray.toString().split(",").pop(), "correctWords", checkType());
        
    //If incorrect
    } else {
        userInput.style.borderStyle = "solid"; //Creates the red incorrect border
        userInput.style.borderColor = "red";
        incorrectWordsArray.push(userInput.value);
        addPill((incorrectWordsArray.toString().split(",").pop()), "incorrectWords", "wordPill");
    }; 

    count.innerText = `${total} / ${counter}`;
    percentage.innerText = Math.trunc(generatePercentage(total, counter)) + " %";
    document.getElementById("correctCount").innerHTML = "Correct Words (" + total + ")" + "<hr>";
    document.getElementById("incorrectCount").innerHTML = "Incorrect Words (" + incorrectWordsArray.length + ")" + "<hr>";
};

//Waiting for [Space] 32 or [Enter] 13 input
userInput.addEventListener('keydown', event => {

    if (event.keyCode === 32 || event.keyCode === 13) {
        userInput.style.borderStyle = "hidden";

        if (userInput.value.trim() !== "") { //If the input is not blank
            gameRun();
            userInput.value = "";
            p.innerText = generateWord();

        } else { //Handles the case where a user only enters a blank space
            userInput.style.borderColor = "orange";
            userInput.style.borderStyle = "solid"; //Shows the 
            userInput.value = null;
        };

    };
});

//Initiates game start
startButton.addEventListener("click", event => {
    clearData()
    generateArray();
    generateWord();
    //getLengthRange();
    p.innerText = generateWord();
    startButton.hidden = true;
    restartButton.hidden = false;
    console.log(slider.min, slider.max);
});

//Resets game environment with any changes made
restartButton.addEventListener("click", event => {
    generateArray();
    p.innerText = generateWord();
    clearData();
});

slider.oninput = function() {
    sliderDisplay.innerText = `Max Length: ${slider.value}`;
    generateArray();
    p.innerText = generateWord();
};