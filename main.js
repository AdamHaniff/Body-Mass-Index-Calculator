import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const metricHeightInput = document.getElementsByName("centimeters")[0];
const metricWeightInput = document.getElementsByName("kilograms")[0];
const bmiNumber = document.querySelector(".BMI-result__number");
const bmiParagraph = document.querySelector(".BMI-result__paragraph");
const bmiIdealWeight = document.querySelector(".BMI-result__ideal-weight");
const bmiResult = document.querySelector(".BMI-result");
const bmiWelcome = document.querySelector(".BMI-welcome");

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

function displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight) {
  bmiNumber.textContent = bmi;
  bmiParagraph.textContent = `Your BMI suggests you're ${category}. Your ideal weight is
  between`;
  bmiIdealWeight.textContent = `${minIdealWeight}kgs - ${maxIdealWeight}kgs`;
  bmiWelcome.classList.add("hidden");
  bmiResult.classList.remove("hidden");
}

// EVENT LISTENER CALLBACK FUNCTION
function calculateBMI() {
  height = parseFloat(metricHeightInput.value);
  weight = parseFloat(metricWeightInput.value);

  if (!isValidHeightandWeight(height, weight)) return;
  const bmi = (weight / ((height * height) / 10000)).toFixed(1);
  const category = categorizeBMI(bmi);
  const { minIdealWeight, maxIdealWeight } = calculateIdealWeightRange(height);
  displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight);
}

// EVENT LISTENERS
metricHeightInput.addEventListener("input", calculateBMI);
metricWeightInput.addEventListener("input", calculateBMI);
