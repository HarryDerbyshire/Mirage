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