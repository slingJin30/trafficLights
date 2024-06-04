// Project: Traffic Light Simulator


// Get DOM elements
const redLightButton = document.getElementById("stopLightBtn");
const greenLightButton = document.getElementById("greenLightBtn");
const yellowLightButton = document.getElementById("yellowLightBtn");
const yellowLightId = document.getElementById("yellowLight");
const greenLightId = document.getElementById("greenLight");
const redLightId = document.getElementById("redLight");

// Set default lights state
function setDefaultLights() {
    try {
        redLightId.style.backgroundColor = "#000";
        greenLightId.style.backgroundColor = "#000";
        yellowLightId.style.backgroundColor = "#000";
    } catch (error) {
        console.error("Error setting default lights:", error);
    }
}

// Function to change light color
function changeLightColor(lightId, color) {
    try {
        redLightId.style.backgroundColor = "#000";
        greenLightId.style.backgroundColor = "#000";
        yellowLightId.style.backgroundColor = "#000";
        lightId.style.backgroundColor = color;
    } catch (error) {
        console.error("Error changing light color:", error);
    }
}

// Event listener for all light buttons
document.addEventListener("click", function (event) {
    const buttonId = event.target.id;
    switch (buttonId) {
        case "stopLightBtn":
            changeLightColor(redLightId, "#ff0000");
            break;
        case "greenLightBtn":
            changeLightColor(greenLightId, "#00b807");
            break;
        case "yellowLightBtn":
            changeLightColor(yellowLightId, "#fab005");
            break;
        default:
            break;
    }
});

// Set default lights on page load
window.onload = function () {
    try {
        setDefaultLights();
    } catch (error) {
        console.error("Error setting default lights on page load:", error);
    }
};
