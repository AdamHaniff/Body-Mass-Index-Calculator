import "core-js/stable";
import "regenerator-runtime/runtime";

// // METRIC MEASUREMENTS

// // VARIABLES
// const metricHeightInput = document.getElementById("heightCM");
// const metricWeightInput = document.getElementById("weightKG");
// const bmiNumber = document.querySelector(".BMI-result__number");
// const bmiParagraph = document.querySelector(".BMI-result__paragraph");
// const bmiResult = document.querySelector(".BMI-result");
// const bmiWelcome = document.querySelector(".BMI-welcome");
// const bmiMeaning = document.querySelector(".BMI-meaning");

// // HELPER FUNCTIONS
// function isValidHeightandWeight(height, weight) {
//   const conditions = [
//     typeof height === "number",
//     typeof weight === "number",
//     weight > 0,
//     height > 0,
//   ];

//   return conditions.every((condition) => condition);
// }

// function categorizeBMI(bmi) {
//   let category;

//   switch (true) {
//     case bmi < 18.5:
//       category = "underweight";
//       break;
//     case bmi < 24.9:
//       category = "a healthy weight";
//       break;
//     case bmi < 29.9:
//       category = "overweight";
//       break;
//     default:
//       category = "obese";
//   }

//   return category;
// }

// function calculateIdealWeightRange(height) {
//   const minBMI = 18.5;
//   const maxBMI = 24.9;

//   const minIdealWeight = ((minBMI * (height * height)) / 10000).toFixed(1);
//   const maxIdealWeight = ((maxBMI * (height * height)) / 10000).toFixed(1);

//   return {
//     minIdealWeight: minIdealWeight,
//     maxIdealWeight: maxIdealWeight,
//   };
// }

// function displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight) {
//   bmiNumber.textContent = bmi;
//   const bmiParagraphHTML = `Your BMI suggests you're ${category}. Your ideal weight is between <span class="BMI-result__ideal-weight">${minIdealWeight}kgs - ${maxIdealWeight}kgs</span>.`;
//   bmiParagraph.innerHTML = bmiParagraphHTML;
//   bmiWelcome.classList.add("hidden");
//   bmiResult.classList.remove("hidden");
//   bmiMeaning.style.marginTop = "55.2rem";
// }

// function displayBMIWelcome() {
//   if (!metricHeightInput.value && !metricWeightInput.value) {
//     bmiResult.classList.add("hidden");
//     bmiWelcome.classList.remove("hidden");
//     bmiMeaning.style.marginTop = "44rem";
//   }
// }

// // EVENT LISTENER CALLBACK FUNCTION
// function calculateBMI() {
//   const height = parseFloat(metricHeightInput.value);
//   const weight = parseFloat(metricWeightInput.value);

//   displayBMIWelcome();
//   if (!isValidHeightandWeight(height, weight)) return;
//   const bmi = (weight / ((height * height) / 10000)).toFixed(1);
//   const category = categorizeBMI(bmi);
//   const { minIdealWeight, maxIdealWeight } = calculateIdealWeightRange(height);
//   displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight);
// }

// // EVENT LISTENERS
// metricHeightInput.addEventListener("input", calculateBMI);
// metricWeightInput.addEventListener("input", calculateBMI);

// // IMPERIAL MEASUREMENTS

// // VARIABLES
// const radioContainer = document.querySelector(".BMI-details__units");
// const metricMeasurements = document.querySelector(".metric-measurements");
// const imperialMeasurements = document.querySelector(".imperial-measurements");
// const imperialFeetInput = document.getElementById("heightFT");
// const imperialInchesInput = document.getElementById("heightIN");
// const imperialStoneInput = document.getElementById("weightST");
// const imperialPoundsInput = document.getElementById("weightLBS");

// // HELPER FUNCTIONS
// function displayImperialBMIWelcome(heightFT, heightIN, weightST, weightLBS) {
//   if (!heightFT && !heightIN && !weightST && !weightLBS) {
//     bmiResult.classList.add("hidden");
//     bmiWelcome.classList.remove("hidden");
//     bmiMeaning.style.marginTop = "44rem";
//   }
// }

// function isValidImperialMeasurements(heightFT, heightIN, weightST, weightLBS) {
//   const conditions = [
//     typeof heightFT === "number",
//     typeof heightIN === "number",
//     typeof weightST === "number",
//     typeof weightLBS === "number",
//     heightFT > 0,
//     weightST > 0,
//   ];

//   return conditions.every((condition) => condition);
// }

// function calculateImperialIdealWeight(heightInInches) {
//   const minBMI = 18.5;
//   const maxBMI = 24.9;

//   const minIdealWeight = (
//     (minBMI * (heightInInches * heightInInches)) /
//     703
//   ).toFixed(1);
//   const maxIdealWeight = (
//     (maxBMI * (heightInInches * heightInInches)) /
//     703
//   ).toFixed(1);

//   return {
//     minIdealWeight: minIdealWeight,
//     maxIdealWeight: maxIdealWeight,
//   };
// }

// // prettier-ignore
// function displayImperialBMIResult(bmi, category, minIdealWeight, maxIdealWeight) {
//   const minWeightST = Math.floor(minIdealWeight / 14);
//   const minWeightLBS = Math.floor(minIdealWeight - (minWeightST * 14));
//   const maxWeightST = Math.floor(maxIdealWeight / 14);
//   const maxWeightLBS = Math.floor(maxIdealWeight - (maxWeightST * 14));
//   const minWeightUnitLabel = minWeightLBS === 1 ? 'lb' : 'lbs';
//   const maxWeightUnitLabel = maxWeightLBS === 1 ? 'lb' : 'lbs';

//   bmiNumber.textContent = bmi;
//   const bmiParagraphHTML = `Your BMI suggests you're ${category}. Your ideal weight is between <span class="BMI-result__ideal-weight">${minWeightST}st ${minWeightLBS}${minWeightUnitLabel} - ${maxWeightST}st ${maxWeightLBS}${maxWeightUnitLabel}</span>.`;
//   bmiParagraph.innerHTML = bmiParagraphHTML;
//   bmiWelcome.classList.add("hidden");
//   bmiResult.classList.remove("hidden");
//   bmiMeaning.style.marginTop = "55.2rem";
// }

// function clearMetricInputs() {
//   metricHeightInput.value = "";
//   metricWeightInput.value = "";
// }

// function clearImperialInputs() {
//   imperialFeetInput.value = "";
//   imperialInchesInput.value = "";
//   imperialStoneInput.value = "";
//   imperialPoundsInput.value = "";
// }

// // EVENT LISTENER CALLBACK FUNCTIONS
// function handleRadioBtnChange(e) {
//   const radioBtn = e.target;
//   if (radioBtn.id === "imperial") {
//     imperialMeasurements.classList.toggle("hidden");
//     metricMeasurements.classList.toggle("hidden");
//     clearMetricInputs();
//     displayBMIWelcome();
//   } else if (radioBtn.id === "metric") {
//     metricMeasurements.classList.toggle("hidden");
//     imperialMeasurements.classList.toggle("hidden");
//     clearImperialInputs();
//     displayBMIWelcome();
//   }
// }

// function calculateImperialBMI() {
//   const heightFT = parseFloat(imperialFeetInput.value);
//   const heightIN =
//     imperialInchesInput.value === ""
//       ? 0
//       : parseFloat(imperialInchesInput.value);
//   const weightST = parseFloat(imperialStoneInput.value);
//   const weightLBS =
//     imperialPoundsInput.value === ""
//       ? 0
//       : parseFloat(imperialPoundsInput.value);
//   const heightInInches = heightFT * 12 + heightIN;
//   const weightInPounds = weightST * 14 + weightLBS;

//   displayImperialBMIWelcome(heightFT, heightIN, weightST, weightLBS);
//   if (!isValidImperialMeasurements(heightFT, heightIN, weightST, weightLBS))
//     return;
//   // prettier-ignore
//   const bmi = ((weightInPounds / (heightInInches * heightInInches)) * 703).toFixed(1);
//   const category = categorizeBMI(bmi);
//   const { minIdealWeight, maxIdealWeight } =
//     calculateImperialIdealWeight(heightInInches);
//   displayImperialBMIResult(bmi, category, minIdealWeight, maxIdealWeight);
// }

// // EVENT LISTENERS
// radioContainer.addEventListener("change", handleRadioBtnChange);
// imperialFeetInput.addEventListener("input", calculateImperialBMI);
// imperialInchesInput.addEventListener("input", calculateImperialBMI);
// imperialStoneInput.addEventListener("input", calculateImperialBMI);
// imperialPoundsInput.addEventListener("input", calculateImperialBMI);

// REFACTORED CODE

// VARIABLES
const metricHeightInput = document.getElementById("heightCM");
const metricWeightInput = document.getElementById("weightKG");
const bmiNumber = document.querySelector(".BMI-result__number");
const bmiParagraph = document.querySelector(".BMI-result__paragraph");
const bmiResult = document.querySelector(".BMI-result");
const bmiWelcome = document.querySelector(".BMI-welcome");
const bmiMeaning = document.querySelector(".BMI-meaning");
const radioContainer = document.querySelector(".BMI-details__units");
const metricMeasurements = document.querySelector(".metric-measurements");
const imperialMeasurements = document.querySelector(".imperial-measurements");
const imperialFeetInput = document.getElementById("heightFT");
const imperialInchesInput = document.getElementById("heightIN");
const imperialStoneInput = document.getElementById("weightST");
const imperialPoundsInput = document.getElementById("weightLBS");
const metricRadioBtn = document.getElementById("metric");
const imperialRadioBtn = document.getElementById("imperial");

// HELPER FUNCTIONS
function isValidMeasurements(measurements) {
  const { heightCM, weightKG, heightFT, heightIN, weightST, weightLBS } =
    measurements;
  let conditions = [];

  if (metricRadioBtn.checked) {
    conditions = [
      typeof heightCM === "number",
      typeof weightKG === "number",
      heightCM > 0,
      weightKG > 0,
    ];
  }

  if (imperialRadioBtn.checked) {
    conditions = [
      typeof heightFT === "number",
      typeof heightIN === "number",
      typeof weightST === "number",
      typeof weightLBS === "number",
      heightFT > 0,
      weightST > 0,
    ];
  }

  return conditions.every((condition) => condition);
}

function calculateIdealWeightRange(heightMeasurement) {
  const minBMI = 18.5;
  const maxBMI = 24.9;
  let minIdealWeight = null;
  let maxIdealWeight = null;

  if (metricRadioBtn.checked) {
    minIdealWeight = (
      (minBMI * (heightMeasurement * heightMeasurement)) /
      10000
    ).toFixed(1);
    maxIdealWeight = (
      (maxBMI * (heightMeasurement * heightMeasurement)) /
      10000
    ).toFixed(1);
  }

  if (imperialRadioBtn.checked) {
    minIdealWeight = (
      (minBMI * (heightMeasurement * heightMeasurement)) /
      703
    ).toFixed(1);
    maxIdealWeight = (
      (maxBMI * (heightMeasurement * heightMeasurement)) /
      703
    ).toFixed(1);
  }

  return {
    minIdealWeight: minIdealWeight,
    maxIdealWeight: maxIdealWeight,
  };
}

function displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight) {
  bmiNumber.textContent = bmi;
  let bmiParagraphHTML = "";

  if (metricRadioBtn.checked) {
    bmiParagraphHTML = `Your BMI suggests you're ${category}. Your ideal weight is between <span class="BMI-result__ideal-weight">${minIdealWeight}kgs - ${maxIdealWeight}kgs</span>.`;
  }

  if (imperialRadioBtn.checked) {
    const minWeightST = Math.floor(minIdealWeight / 14);
    const minWeightLBS = Math.floor(minIdealWeight - minWeightST * 14);
    const maxWeightST = Math.floor(maxIdealWeight / 14);
    const maxWeightLBS = Math.floor(maxIdealWeight - maxWeightST * 14);
    const minWeightUnitLabel = minWeightLBS === 1 ? "lb" : "lbs";
    const maxWeightUnitLabel = maxWeightLBS === 1 ? "lb" : "lbs";

    bmiParagraphHTML = `Your BMI suggests you're ${category}. Your ideal weight is between <span class="BMI-result__ideal-weight">${minWeightST}st ${minWeightLBS}${minWeightUnitLabel} - ${maxWeightST}st ${maxWeightLBS}${maxWeightUnitLabel}</span>.`;
  }

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

function displayImperialBMIWelcome(heightFT, heightIN, weightST, weightLBS) {
  if (!heightFT && !heightIN && !weightST && !weightLBS) {
    bmiResult.classList.add("hidden");
    bmiWelcome.classList.remove("hidden");
    bmiMeaning.style.marginTop = "44rem";
  }
}

function clearMetricInputs() {
  metricHeightInput.value = "";
  metricWeightInput.value = "";
}

function clearImperialInputs() {
  imperialFeetInput.value = "";
  imperialInchesInput.value = "";
  imperialStoneInput.value = "";
  imperialPoundsInput.value = "";
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

// EVENT LISTENER CALLBACK FUNCTIONS
function calculateBMI() {
  const heightCM = parseFloat(metricHeightInput.value);
  const weightKG = parseFloat(metricWeightInput.value);

  displayBMIWelcome();
  if (!isValidMeasurements({ heightCM: heightCM, weightKG: weightKG })) return;
  const bmi = (weightKG / ((heightCM * heightCM) / 10000)).toFixed(1);
  const category = categorizeBMI(bmi);
  const { minIdealWeight, maxIdealWeight } =
    calculateIdealWeightRange(heightCM);
  displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight);
}

function calculateImperialBMI() {
  const heightFT = parseFloat(imperialFeetInput.value);
  const heightIN =
    imperialInchesInput.value === ""
      ? 0
      : parseFloat(imperialInchesInput.value);
  const weightST = parseFloat(imperialStoneInput.value);
  const weightLBS =
    imperialPoundsInput.value === ""
      ? 0
      : parseFloat(imperialPoundsInput.value);
  const heightInInches = heightFT * 12 + heightIN;
  const weightInPounds = weightST * 14 + weightLBS;

  displayImperialBMIWelcome(heightFT, heightIN, weightST, weightLBS);
  if (
    !isValidMeasurements({
      heightFT: heightFT,
      heightIN: heightIN,
      weightST: weightST,
      weightLBS: weightLBS,
    })
  )
    return;
  // prettier-ignore
  const bmi = ((weightInPounds / (heightInInches * heightInInches)) * 703).toFixed(1);
  const category = categorizeBMI(bmi);
  const { minIdealWeight, maxIdealWeight } =
    calculateIdealWeightRange(heightInInches);
  displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight);
}

function handleRadioBtnChange(e) {
  const radioBtn = e.target;
  if (radioBtn.id === "imperial") {
    imperialMeasurements.classList.toggle("hidden");
    metricMeasurements.classList.toggle("hidden");
    clearMetricInputs();
    displayBMIWelcome();
  } else if (radioBtn.id === "metric") {
    metricMeasurements.classList.toggle("hidden");
    imperialMeasurements.classList.toggle("hidden");
    clearImperialInputs();
    displayBMIWelcome();
  }
}

// EVENT LISTENERS
metricHeightInput.addEventListener("input", calculateBMI);
metricWeightInput.addEventListener("input", calculateBMI);
radioContainer.addEventListener("change", handleRadioBtnChange);
imperialFeetInput.addEventListener("input", calculateImperialBMI);
imperialInchesInput.addEventListener("input", calculateImperialBMI);
imperialStoneInput.addEventListener("input", calculateImperialBMI);
imperialPoundsInput.addEventListener("input", calculateImperialBMI);
