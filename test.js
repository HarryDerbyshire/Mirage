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
    setInterval(function() {
        timeBar.value += 10;
        if (timeBar.value >= 100) {
            testInput.disabled ="true" //this control works for disabling elements
        };
    }, 1000);
});

//timer.innerText = time;

