function addPill (pillName) {

    let newDiv = document.createElement("div");
    let newContent = document.createTextNode(pillName);
    newDiv.appendChild(newContent);
    newDiv.className = "testDiv";

    let currentDiv = document.getElementById("pillTest");
    currentDiv.insertAdjacentElement("afterend", newDiv);
}
addPill("Jeff");
addPill("Barry");

let timeBar = document.getElementById("progress");
let timer = document.getElementById("timer");
let button = document.getElementById("testBtn");
let startTime = Date.now();
let endTime = startTime + 1000;
let testInput = document.getElementById("inputBox");

function time() {
    for (let i = 0; i < (endTime - Date.now()); i++) {
        console.log(endTime - Date.now());
        timeBar.value = (startTime / endTime) * 100;
    };
};

button.addEventListener("click", event => {
    
    testInput.disabled = false;
    testInput.focus();
    timerMode(5);
});

//timer.innerText = time;

function timerMode(timeSeconds) {
    timeBar.max = timeSeconds * 1000;
    timeBar.value = timeBar.max;
    button.disabled = true;
    let t = setInterval(function() {
                timeBar.value -= 100;
                    if (timeBar.value <= 0) {
                        testInput.disabled =true;
                        testInput.value = "";
                        button.disabled = false;
                        clearInterval(t);
                    };
            }, 100);
}