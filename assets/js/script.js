const redLightButton = document.getElementById("stopLightBtn");
const greenLightButton = document.getElementById("greenLightBtn");
const yellowLightButton = document.getElementById("yellowLightBtn");
const yellowLightId = document.getElementById("yellowLight");
const greenLightId = document.getElementById("greenLight");
const redLightId = document.getElementById("redLight");

const defaultLights = (window.onload = function () {
  redLightId.style.backgroundColor = "black";
  greenLightId.style.backgroundColor = "black";
  yellowLightId.style.backgroundColor = "black";
});

redLightButton.addEventListener("click", function () {
  redLightId.style.backgroundColor == "black"
    ? (redLightId.style.backgroundColor = "red")
    : (redLightId.style.backgroundColor = "black");
  if (greenLightId.style.backgroundColor == "green") {
    greenLightId.style.backgroundColor = "black";
  }
  if (yellowLightId.style.backgroundColor == "yellow") {
    yellowLightId.style.backgroundColor = "black";
  }
});

greenLightButton.addEventListener("click", function () {
  greenLightId.style.backgroundColor == "black"
    ? (greenLightId.style.backgroundColor = "green")
    : (greenLightId.style.backgroundColor = "black");
  if (yellowLightId.style.backgroundColor == "yellow") {
    yellowLightId.style.backgroundColor = "black";
  }
  if (redLightId.style.backgroundColor == "red") {
    redLightId.style.backgroundColor = "black";
  }
});

yellowLightButton.addEventListener("click", function () {
  yellowLightId.style.backgroundColor == "black"
    ? (yellowLightId.style.backgroundColor = "yellow")
    : (yellowLightId.style.backgroundColor = "black");
  if (redLightId.style.backgroundColor == "red") {
    redLightId.style.backgroundColor = "black";
  }
  if (greenLightId.style.backgroundColor == "green") {
    greenLightId.style.backgroundColor = "black";
  }
});
