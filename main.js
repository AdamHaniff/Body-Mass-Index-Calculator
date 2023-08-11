import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
const metricHeightInput = document.getElementById("heightCM");
const metricWeightInput = document.getElementById("weightKG");
const bmiNumber = document.querySelector(".BMI-result__number");
const bmiParagraph = document.querySelector(".BMI-result__paragraph");
const bmiResult = document.querySelector(".BMI-result");
const bmiWelcome = document.querySelector(".BMI-welcome");
const bmiMeaning = document.querySelector(".BMI-meaning");

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
  const bmiParagraphHTML = `Your BMI suggests you're ${category}. Your ideal weight is between <span class="BMI-result__ideal-weight">${minIdealWeight}kgs - ${maxIdealWeight}kgs</span>.`;
  bmiParagraph.innerHTML = bmiParagraphHTML;
  bmiWelcome.classList.add("hidden");
  bmiResult.classList.remove("hidden");
  bmiMeaning.style.marginTop = "55.2rem";
}

function displayBMIWelcome() {
  if (!metricHeightInput.value && !metricWeightInput.value) {
    bmiResult.classList.add("hidden");
    bmiWelcome.classList.remove("hidden");
    bmiMeaning.style.marginTop = "44rem";
  }
}

// EVENT LISTENER CALLBACK FUNCTION
function calculateBMI() {
  const height = parseFloat(metricHeightInput.value);
  const weight = parseFloat(metricWeightInput.value);

  displayBMIWelcome();
  if (!isValidHeightandWeight(height, weight)) return;
  const bmi = (weight / ((height * height) / 10000)).toFixed(1);
  const category = categorizeBMI(bmi);
  const { minIdealWeight, maxIdealWeight } = calculateIdealWeightRange(height);
  displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight);
}

// EVENT LISTENERS
metricHeightInput.addEventListener("input", calculateBMI);
metricWeightInput.addEventListener("input", calculateBMI);

// VARIABLES
const radioContainer = document.querySelector(".BMI-details__units");
const metricMeasurements = document.querySelector(".metric-measurements");
const imperialMeasurements = document.querySelector(".imperial-measurements");
const imperialFeetInput = document.getElementById("heightFT");
const imperialInchesInput = document.getElementById("heightIN");
const imperialStoneInput = document.getElementById("weightST");
const imperialPoundsInput = document.getElementById("weightLBS");

// HELPER FUNCTIONS
function displayImperialBMIWelcome(heightFT, heightIN, weightST, weightLBS) {
  if (!heightFT && !heightIN && !weightST && !weightLBS) {
    bmiResult.classList.add("hidden");
    bmiWelcome.classList.remove("hidden");
    bmiMeaning.style.marginTop = "44rem";
  }
}

function isValidImperialMeasurements(heightFT, heightIN, weightST, weightLBS) {
  const conditions = [
    typeof heightFT === "number",
    typeof heightIN === "number",
    typeof weightST === "number",
    typeof weightLBS === "number",
    heightFT > 0,
    weightST > 0,
  ];

  return conditions.every((condition) => condition);
}

function calculateImperialIdealWeight(heightInInches) {
  const minBMI = 18.5;
  const maxBMI = 24.9;

  const minIdealWeight = (
    (minBMI * (heightInInches * heightInInches)) /
    703
  ).toFixed(1);
  const maxIdealWeight = (
    (maxBMI * (heightInInches * heightInInches)) /
    703
  ).toFixed(1);

  return {
    minIdealWeight: minIdealWeight,
    maxIdealWeight: maxIdealWeight,
  };
}

// prettier-ignore
function displayImperialBMIResult(bmi, category, minIdealWeight, maxIdealWeight) {
  console.log(minIdealWeight, maxIdealWeight); 
  const minWeightST = Math.floor(minIdealWeight / 14);
  const minWeightLBS = Math.floor(minIdealWeight - (minWeightST * 14)); 
  const maxWeightST = Math.floor(maxIdealWeight / 14); 
  const maxWeightLBS = Math.floor(maxIdealWeight - (maxWeightST * 14)); 
  console.log(minWeightST, minWeightLBS, maxWeightST, maxWeightLBS); 

  bmiNumber.textContent = bmi; 
  const bmiParagraphHTML = `Your BMI suggests you're ${category}. Your ideal weight is between <span class="BMI-result__ideal-weight">${minWeightST}st ${minWeightLBS}lbs - ${maxWeightST}st ${maxWeightLBS}lbs</span>.`;
  bmiParagraph.innerHTML = bmiParagraphHTML;
  bmiWelcome.classList.add("hidden");
  bmiResult.classList.remove("hidden");
  bmiMeaning.style.marginTop = "55.2rem";
}

// EVENT LISTENER CALLBACK FUNCTIONS
function handleRadioBtnChange(e) {
  const radioBtn = e.target;
  if (radioBtn.id === "imperial") {
    imperialMeasurements.classList.toggle("hidden");
    metricMeasurements.classList.toggle("hidden");
  } else if (radioBtn.id === "metric") {
    metricMeasurements.classList.toggle("hidden");
    imperialMeasurements.classList.toggle("hidden");
  }
}

function calculateImperialBMI() {
  const heightFT = parseFloat(imperialFeetInput.value);
  const heightIN = parseFloat(imperialInchesInput.value);
  const weightST = parseFloat(imperialStoneInput.value);
  const weightLBS = parseFloat(imperialPoundsInput.value);
  const heightInInches = heightFT * 12 + heightIN;
  const weightInPounds = weightST * 14 + weightLBS;

  displayImperialBMIWelcome(heightFT, heightIN, weightST, weightLBS);
  if (!isValidImperialMeasurements(heightFT, heightIN, weightST, weightLBS))
    return;
  // prettier-ignore
  const bmi = ((weightInPounds / (heightInInches * heightInInches)) * 703).toFixed(1);
  const category = categorizeBMI(bmi);
  const { minIdealWeight, maxIdealWeight } =
    calculateImperialIdealWeight(heightInInches);
  displayImperialBMIResult(bmi, category, minIdealWeight, maxIdealWeight);
}

// EVENT LISTENERS
radioContainer.addEventListener("change", handleRadioBtnChange);
imperialFeetInput.addEventListener("input", calculateImperialBMI);
imperialInchesInput.addEventListener("input", calculateImperialBMI);
imperialStoneInput.addEventListener("input", calculateImperialBMI);
imperialPoundsInput.addEventListener("input", calculateImperialBMI);
