import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const metricHeightInput = document.getElementsByName("centimeters")[0];
const metricWeightInput = document.getElementsByName("kilograms")[0];

// HELPER FUNCTIONS
function isValidHeightandWeight(height, weight) {
  const conditions = [
    typeof height === "number",
    typeof weight === "number",
    weight > 0,
    height > 0,
  ];

  return conditions.every((condition) => condition);
}

function categorizeBMI(bmi) {
  let category;

  switch (true) {
    case bmi < 18.5:
      category = "underweight";
      break;
    case bmi < 24.9:
      category = "a healthy weight";
      break;
    case bmi < 29.9:
      category = "overweight";
      break;
    default:
      category = "obese";
  }

  return category;
}

function calculateIdealWeightRange(height) {
  const minBMI = 18.5;
  const maxBMI = 24.9;

  const minIdealWeight = ((minBMI * (height * height)) / 10000).toFixed(1);
  const maxIdealWeight = ((maxBMI * (height * height)) / 10000).toFixed(1);

  return {
    minIdealWeight: minIdealWeight,
    maxIdealWeight: maxIdealWeight,
  };
}

// EVENT LISTENER CALLBACK FUNCTION
function calculateBMI() {
  height = parseFloat(metricHeightInput.value);
  weight = parseFloat(metricWeightInput.value);

  if (!isValidHeightandWeight(height, weight)) return;
  const bmi = (weight / ((height * height) / 10000)).toFixed(1);
  const category = categorizeBMI(bmi);
  const { minIdealWeight, maxIdealWeight } = calculateIdealWeightRange(height);
}

// EVENT LISTENERS
metricHeightInput.addEventListener("input", calculateBMI);
metricWeightInput.addEventListener("input", calculateBMI);

// AFTER BMI IS CALCULATED
// WE WANT TO HIDE WELCOME, DISPLAY RESULT
