import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const metricHeightInput = document.getElementsByName("centimeters")[0];
const metricWeightInput = document.getElementsByName("kilograms")[0];
let height = null;
let weight = null;

// HELPER FUNCTION
function isValidHeightandWeight() {
  const conditions = [
    typeof height === "number",
    typeof weight === "number",
    weight > 0,
    height > 0,
  ];

  return conditions.every((condition) => condition);
}

// EVENT LISTENER CALLBACK FUNCTION
function calculateBMI() {
  height = parseFloat(metricHeightInput.value);
  weight = parseFloat(metricWeightInput.value);

  isValidHeightandWeight();
  if (!isValidHeightandWeight) return;
  const bmi = weight / ((height * height) / 10000);
  console.log(bmi);
}

// EVENT LISTENERS
metricHeightInput.addEventListener("input", calculateBMI);
metricWeightInput.addEventListener("input", calculateBMI);
