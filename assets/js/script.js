// Project: Traffic Light Simulator Pro

// Get DOM elements
const redLightElement = document.getElementById("redLight");
const yellowLightElement = document.getElementById("yellowLight");
const greenLightElement = document.getElementById("greenLight");
const pedestrianLightElement = document.getElementById("pedestrianLight"); // Added
const manualControlsElement = document.querySelector(".controls"); // Container for manual buttons
const featureControlsElement = document.getElementById("featureControls"); // Container for new feature buttons

// Store all light elements in an array for easier manipulation
const allLights = [redLightElement, yellowLightElement, greenLightElement];
// Note: pedestrianLightElement is handled separately as its states are different.

// Automatic Sequencing Variables
let autoSequenceInterval = null;
let currentLightIndex = 0; // 0: Green, 1: Yellow, 2: Red
const lightDurations = {
    green: 5000, // ms
    yellow: 2000, // ms
    red: 5000    // ms
};
const sequenceOrder = [
    { light: greenLightElement, duration: lightDurations.green, name: "green" },
    { light: yellowLightElement, duration: lightDurations.yellow, name: "yellow" },
    { light: redLightElement, duration: lightDurations.red, name: "red" }
];

// Special Modes Variables
let specialModeInterval = null;
let currentSpecialMode = null; // e.g., "flashYellow", "flashRed", "allOff"

/**
 * Deactivates all lights by removing 'active' and 'flashing-light' classes.
 */
function deactivateAllLights() {
    allLights.forEach(light => {
        if (light) {
            light.classList.remove("active", "flashing-light");
        } else {
            console.warn("A light element was not found during deactivation.");
        }
    });
    // Also ensure pedestrian light is reset if it's part of a general deactivation logic
    // setPedestrianSignal("dont-walk"); // Or handle as per specific mode needs
}

/**
 * Activates a specific light by adding the 'active' class.
 * Used for standard solid light activation.
 * @param {HTMLElement} lightElement - The light element to activate.
 */
function activateLight(lightElement) {
    if (currentSpecialMode) return; // Don't activate if a special mode is active

    if (lightElement) {
        deactivateAllLights();
        lightElement.classList.add("active");
    } else {
        console.warn("Attempted to activate a non-existent light element.");
    }
}


/**
 * Advances the automatic traffic light sequence.
 */
function advanceAutoSequence() {
    if (currentSpecialMode) return; // Don't advance if a special mode is active
    deactivateAllLights();
    const currentLightConfig = sequenceOrder[currentLightIndex];

    if (currentLightConfig && currentLightConfig.light) {
        currentLightConfig.light.classList.add("active");
        updatePedestrianSignal(currentLightConfig.name); // Update pedestrian signal based on current light
        console.log(`Auto: ${currentLightConfig.name} light ON for ${currentLightConfig.duration / 1000}s`);
    } else {
        console.error("Invalid light configuration in sequence at index:", currentLightIndex);
        setPedestrianSignal("dont-walk"); // Default to don't walk on error
        stopAutoSequence(); // Stop if there's an error
        return;
    }

    // Set timeout for the current light's duration
    autoSequenceInterval = setTimeout(() => {
        currentLightIndex = (currentLightIndex + 1) % sequenceOrder.length;
        advanceAutoSequence(); // Call recursively for the next light
    }, currentLightConfig.duration);
}

/**
 * Starts the automatic traffic light sequence.
 */
function startAutoSequence() {
    if (autoSequenceInterval) { // Already running
        console.log("Automatic sequence is already running.");
        return;
    }
    if (currentSpecialMode) {
        console.log("Cannot start auto sequence while a special mode is active.");
        return;
    }
    console.log("Starting automatic sequence...");
    stopAllSpecialModes(); // Ensure no special modes are running
    disableManualControls(true);
    disableSpecialModeControls(true);
    currentLightIndex = 0; // Start with green (or the first in sequenceOrder)
    advanceAutoSequence();

    // Update button states if start/stop buttons exist
    const startAutoBtn = document.getElementById("startAutoBtn");
    const stopAutoBtn = document.getElementById("stopAutoBtn");
    if (startAutoBtn) startAutoBtn.disabled = true;
    if (stopAutoBtn) stopAutoBtn.disabled = false;
}

/**
 * Stops the automatic traffic light sequence.
 */
function stopAutoSequence(calledBySpecialMode = false) {
    if (!autoSequenceInterval) {
        // console.log("Automatic sequence is not running."); // Can be noisy
        return;
    }
    console.log("Stopping automatic sequence.");
    clearTimeout(autoSequenceInterval);
    autoSequenceInterval = null;
    if (!calledBySpecialMode && !currentSpecialMode) { // Avoid deactivating if a special mode is taking over
        deactivateAllLights();
        setPedestrianSignal("dont-walk");
    }
    disableManualControls(false);
    if (!currentSpecialMode) disableSpecialModeControls(false);


    // Update button states
    const startAutoBtn = document.getElementById("startAutoBtn");
    const stopAutoBtn = document.getElementById("stopAutoBtn");
    if (startAutoBtn) startAutoBtn.disabled = false;
    if (stopAutoBtn) stopAutoBtn.disabled = true;
}

/**
 * Activates a special light mode (flashing yellow, flashing red, or all off).
 * @param {"flashYellow" | "flashRed" | "allOff"} mode - The special mode to activate.
 */
function activateSpecialMode(mode) {
    console.log(`Activating special mode: ${mode}`);
    stopAutoSequence(true); // Stop auto sequence, indicating it's due to a special mode
    stopAllSpecialModes(true); // Stop any other special mode

    currentSpecialMode = mode;
    deactivateAllLights(); // Clear existing lights
    disableManualControls(true);
    disableSpecialModeControls(true, mode); // Disable other special mode buttons, enable resume

    const resumeBtn = document.getElementById("resumeNormalBtn");
    if(resumeBtn) resumeBtn.style.display = "inline-block";


    switch (mode) {
        case "flashYellow":
            yellowLightElement.classList.add("active", "flashing-light");
            setPedestrianSignal("dont-walk");
            // CSS animation handles the flashing, no interval needed here for the light itself
            break;
        case "flashRed":
            redLightElement.classList.add("active", "flashing-light");
            // For flashing red, typically pedestrian signal is also Don't Walk.
            setPedestrianSignal("dont-walk");
            break;
        case "allOff":
            // All lights are already off via deactivateAllLights()
            setPedestrianSignal("dont-walk"); // Or could be blank/off
            break;
        default:
            console.warn("Unknown special mode:", mode);
            resumeNormalOperation(); // Fallback to normal
            return;
    }
}

/**
 * Stops all active special modes and reverts to a default state.
 * @param {boolean} calledByNewMode - True if called when switching to another special mode.
 */
function stopAllSpecialModes(calledByNewMode = false) {
    if (!currentSpecialMode && !specialModeInterval) return;

    console.log("Stopping all special modes.");
    currentSpecialMode = null;
    if (specialModeInterval) {
        clearInterval(specialModeInterval);
        specialModeInterval = null;
    }

    if (!calledByNewMode) { // Only do these if not immediately switching to another special mode
        deactivateAllLights(); // Clear flashing classes etc.
        setPedestrianSignal("dont-walk");
        disableManualControls(false);
        disableSpecialModeControls(false);
        const resumeBtn = document.getElementById("resumeNormalBtn");
        if(resumeBtn) resumeBtn.style.display = "none";
    }
}

/**
 * Resumes normal operation from a special mode.
 */
function resumeNormalOperation() {
    console.log("Resuming normal operation.");
    stopAllSpecialModes();
    // Optional: decide if it should try to restart auto sequence or just enable manual
    // For now, just enables manual and resets buttons.
    const startAutoBtn = document.getElementById("startAutoBtn");
    if (startAutoBtn) startAutoBtn.disabled = false;
    const stopAutoBtn = document.getElementById("stopAutoBtn");
    if (stopAutoBtn) stopAutoBtn.disabled = true; // Assuming auto is not restarted by default
}

/**
 * Disables or enables special mode control buttons.
 * @param {boolean} disable - True to disable, false to enable.
 * @param {string|null} activeMode - The currently active special mode, if any.
 */
function disableSpecialModeControls(disable, activeMode = null) {
    const flashYellowBtn = document.getElementById("flashYellowBtn");
    const flashRedBtn = document.getElementById("flashRedBtn");
    const allOffBtn = document.getElementById("allOffBtn");
    const resumeBtn = document.getElementById("resumeNormalBtn");

    if (flashYellowBtn) flashYellowBtn.disabled = (disable && activeMode !== "flashYellow");
    if (flashRedBtn) flashRedBtn.disabled = (disable && activeMode !== "flashRed");
    if (allOffBtn) allOffBtn.disabled = (disable && activeMode !== "allOff");

    if (resumeBtn) {
      if (disable && activeMode) { // A special mode is active
        resumeBtn.style.display = 'inline-block';
        resumeBtn.disabled = false;
      } else { // No special mode active or enabling all buttons
        resumeBtn.style.display = 'none';
        resumeBtn.disabled = true;
      }
    }
}


/**
 * Sets the state of the pedestrian signal.
 * @param {"walk" | "dont-walk" | "flash-dont-walk"} state - The desired state.
 */
function setPedestrianSignal(state) {
    if (!pedestrianLightElement) {
        console.warn("Pedestrian light element not found.");
        return;
    }
    pedestrianLightElement.classList.remove("ped-walk", "ped-dont-walk", "ped-flash-dont-walk");
    switch (state) {
        case "walk":
            pedestrianLightElement.classList.add("ped-walk");
            pedestrianLightElement.textContent = "WALK";
            break;
        case "dont-walk":
            pedestrianLightElement.classList.add("ped-dont-walk");
            pedestrianLightElement.textContent = "DON'T WALK";
            break;
        case "flash-dont-walk": // Optional: Implement flashing if needed
            pedestrianLightElement.classList.add("ped-flash-dont-walk");
            pedestrianLightElement.textContent = "DON'T WALK";
            break;
        default:
            pedestrianLightElement.classList.add("ped-dont-walk");
            pedestrianLightElement.textContent = "DON'T WALK";
            console.warn(`Unknown pedestrian signal state: ${state}`);
    }
}

/**
 * Updates the pedestrian signal based on the current main traffic light state.
 * @param {string} currentMainLightName - Name of the current active main light (e.g., "green", "yellow", "red").
 */
function updatePedestrianSignal(currentMainLightName) {
    // This is a simplified logic. Real pedestrian signals are more complex.
    // For example, "WALK" might only show for a portion of the green light,
    // then a flashing "DON'T WALK" before steady "DON'T WALK" on yellow/red.
    switch (currentMainLightName) {
        case "green":
            // For simplicity, "WALK" during the entire green phase.
            // A more realistic scenario would have WALK for a part, then flashing DON'T WALK.
            setPedestrianSignal("walk");
            break;
        case "yellow":
            setPedestrianSignal("dont-walk"); // Or "flash-dont-walk" for a period
            break;
        case "red":
            setPedestrianSignal("dont-walk");
            break;
        default:
            setPedestrianSignal("dont-walk");
            break;
    }
}

/**
 * Disables or enables manual light control buttons.
 * @param {boolean} disable - True to disable, false to enable.
 */
function disableManualControls(disable) {
    if (manualControlsElement) {
        const buttons = manualControlsElement.querySelectorAll("button");
        buttons.forEach(button => button.disabled = disable);
    }
}


/**
 * Handles click events on the manual control buttons.
 * @param {Event} event - The click event.
 */
function handleManualLightControl(event) {
    if (autoSequenceInterval) {
        console.warn("Manual control disabled while automatic sequence is active.");
        return;
    }

    const clickedButton = event.target.closest("button");
    if (!clickedButton) return;

    deactivateAllLights(); // Turn off all lights first

    try {
        let activeLightName = "";
        switch (clickedButton.id) {
            case "stopLightBtn":
                activateLight(redLightElement);
                activeLightName = "red";
                break;
            case "greenLightBtn":
                activateLight(greenLightElement);
                activeLightName = "green";
                break;
            case "yellowLightBtn":
                activateLight(yellowLightElement);
                activeLightName = "yellow";
                break;
            default:
                console.warn(`Unknown manual button ID: ${clickedButton.id}`);
                setPedestrianSignal("dont-walk"); // Default if no light is activated
                return; // No valid light activated
        }
        updatePedestrianSignal(activeLightName); // Update pedestrian signal based on manual selection
    } catch (error) {
        console.error("Error handling manual light control:", error);
        deactivateAllLights();
        setPedestrianSignal("dont-walk");
    }
}

/**
 * Initializes the traffic light simulator.
 */
function initializeTrafficLight() {
    deactivateAllLights(); // Initial state: all lights off
    setPedestrianSignal("dont-walk"); // Initial state for pedestrian signal

    // Event listener for manual controls
    if (manualControlsElement) {
        manualControlsElement.addEventListener("click", handleManualLightControl);
    } else {
        console.error("Manual controls container not found.");
    }

    // Event listeners for Automatic Mode buttons
    const startAutoBtn = document.getElementById("startAutoBtn");
    const stopAutoBtn = document.getElementById("stopAutoBtn");

    if (startAutoBtn) {
        startAutoBtn.addEventListener("click", startAutoSequence);
    } else {
        console.warn("Start Auto button not found.");
    }

    if (stopAutoBtn) {
        stopAutoBtn.addEventListener("click", () => stopAutoSequence(false)); // Explicitly pass false
    } else {
        console.warn("Stop Auto button not found.");
    }

    // Initial state for auto buttons
    if (stopAutoBtn) stopAutoBtn.disabled = true;

    // Event listeners for Special Mode buttons
    const flashYellowBtn = document.getElementById("flashYellowBtn");
    const flashRedBtn = document.getElementById("flashRedBtn");
    const allOffBtn = document.getElementById("allOffBtn");
    const resumeNormalBtn = document.getElementById("resumeNormalBtn");

    if (flashYellowBtn) {
        flashYellowBtn.addEventListener("click", () => activateSpecialMode("flashYellow"));
    } else {
        console.warn("Flash Yellow button not found.");
    }
    if (flashRedBtn) {
        flashRedBtn.addEventListener("click", () => activateSpecialMode("flashRed"));
    } else {
        console.warn("Flash Red button not found.");
    }
    if (allOffBtn) {
        allOffBtn.addEventListener("click", () => activateSpecialMode("allOff"));
    } else {
        console.warn("All Off button not found.");
    }
    if (resumeNormalBtn) {
        resumeNormalBtn.addEventListener("click", resumeNormalOperation);
    } else {
        console.warn("Resume Normal button not found.");
    }


    // Placeholder for initializing other feature controls
    console.log("Traffic Light Pro initialized. Manual, Automatic, and Special mode controls are set up.");
}

// Initialize when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeTrafficLight);
