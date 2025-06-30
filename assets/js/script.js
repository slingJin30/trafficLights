// Project: Traffic Light Simulator

// Get DOM elements
const redLightElement = document.getElementById("redLight");
const yellowLightElement = document.getElementById("yellowLight");
const greenLightElement = document.getElementById("greenLight");
const controlsElement = document.querySelector(".controls"); // Get the container for buttons

// Store all light elements in an array for easier manipulation
const allLights = [redLightElement, yellowLightElement, greenLightElement];

/**
 * Deactivates all lights by removing the 'active' class.
 */
function deactivateAllLights() {
    allLights.forEach(light => {
        if (light) { // Check if the element exists
            light.classList.remove("active");
        } else {
            console.warn("A light element was not found during deactivation.");
        }
    });
}

/**
 * Activates a specific light by adding the 'active' class.
 * @param {HTMLElement} lightElement - The light element to activate.
 */
function activateLight(lightElement) {
    if (lightElement) { // Check if the element exists
        lightElement.classList.add("active");
    } else {
        console.warn("Attempted to activate a non-existent light element.");
    }
}

/**
 * Handles click events on the control buttons.
 * Uses event delegation on the '.controls' container.
 * @param {Event} event - The click event.
 */
function handleLightControl(event) {
    const clickedButton = event.target.closest("button"); // Get the button element even if a child is clicked

    if (!clickedButton) {
        return; // Exit if the click was not on a button
    }

    deactivateAllLights(); // Turn off all lights first

    try {
        switch (clickedButton.id) {
            case "stopLightBtn":
                activateLight(redLightElement);
                break;
            case "greenLightBtn":
                activateLight(greenLightElement);
                break;
            case "yellowLightBtn":
                activateLight(yellowLightElement);
                break;
            default:
                // If a button without specific logic is clicked, all lights remain off.
                console.warn(`Unknown button ID: ${clickedButton.id}`);
                break;
        }
    } catch (error) {
        console.error("Error handling light control:", error);
        // Optionally, reset to a known safe state
        deactivateAllLights();
    }
}

/**
 * Initializes the traffic light simulator.
 * Sets the default state (all lights off) and attaches event listeners.
 */
function initializeTrafficLight() {
    // Set default lights state (all off) by ensuring no 'active' class is present.
    // The CSS handles the default "off" appearance.
    deactivateAllLights();

    // Add a single event listener to the controls container
    if (controlsElement) {
        controlsElement.addEventListener("click", handleLightControl);
    } else {
        console.error("Controls container not found. Buttons will not work.");
    }
}

// Initialize the traffic light when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeTrafficLight);
