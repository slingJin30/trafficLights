const redLightButton = document.getElementById("stopLightBtn");
const greenLightButton = document.getElementById("greenLightBtn");
const yellowLightButton = document.getElementById("yellowLightBtn");
const yellowLightId = document.getElementById("yellowLight");
const greenLightId = document.getElementById("greenLight");
const redLightId = document.getElementById("redLight");

const defaultLights = (window.onload = function () {
  redLightId.style.backgroundColor = "#000";
  greenLightId.style.backgroundColor = "#000";
  yellowLightId.style.backgroundColor = "#000";
});

redLightButton.addEventListener("click", function () {
  redLightId.style.backgroundColor = "#000"
    ? (redLightId.style.backgroundColor = "#ff0000")
    : (redLightId.style.backgroundColor = "#000");
  if (!(greenLightId.style.backgroundColor = "#00b807")) {
  } else {
    greenLightId.style.backgroundColor = "#000";
  }
  if (!(yellowLightId.style.backgroundColor = "#fab005")) {
  } else {
    yellowLightId.style.backgroundColor = "#000";
  }
});

greenLightButton.addEventListener("click", function () {
  greenLightId.style.backgroundColor = "#000"
    ? (greenLightId.style.backgroundColor = "#00b807")
    : (greenLightId.style.backgroundColor = "#000");
  if (!(yellowLightId.style.backgroundColor = "#fab005")) {
  } else {
    yellowLightId.style.backgroundColor = "#000";
  }
  if (!(redLightId.style.backgroundColor = "#ff0000")) {
  } else {
    redLightId.style.backgroundColor = "#000";
  }
});

yellowLightButton.addEventListener("click", function () {
  yellowLightId.style.backgroundColor = "#000"
    ? (yellowLightId.style.backgroundColor = "#fab005")
    : (yellowLightId.style.backgroundColor = "#000");
  if (!(redLightId.style.backgroundColor = "#ff0000")) {
  } else {
    redLightId.style.backgroundColor = "#000";
  }
  if (!(greenLightId.style.backgroundColor = "#00b807")) {
  } else {
    greenLightId.style.backgroundColor = "#000";
  }
});
