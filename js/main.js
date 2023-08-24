import {
  INCHES_PER_FOOT,
  POUNDS_PER_STONE,
  MOBILE_MARGIN_TOP,
  TABLET_MARGIN_TOP_METRIC,
  TABLET_MARGIN_TOP_IMPERIAL,
  DESKTOP_MARGIN_TOP_METRIC,
  DESKTOP_MARGIN_TOP_IMPERIAL,
} from "./config.js";
import { categorizeBMI } from "./helpers.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

// VARIABLES
let heightCM, weightKG, heightFT, heightIN, weightST, weightLBS;
const metricHeightInput = document.getElementById("heightCM");
const metricWeightInput = document.getElementById("weightKG");
const metricMeasurements = document.querySelector(".metric-measurements");
const metricRadioBtn = document.getElementById("metric");
const bmiNumber = document.querySelector(".BMI-result__number");
const bmiParagraph = document.querySelector(".BMI-result__paragraph");
const bmiResult = document.querySelector(".BMI-result");
const bmiWelcome = document.querySelector(".BMI-welcome");
const bmiMeaning = document.querySelector(".BMI-meaning");
const imperialMeasurements = document.querySelector(".imperial-measurements");
const imperialFeetInput = document.getElementById("heightFT");
const imperialInchesInput = document.getElementById("heightIN");
const imperialStoneInput = document.getElementById("weightST");
const imperialPoundsInput = document.getElementById("weightLBS");
const imperialRadioBtn = document.getElementById("imperial");
const radioContainer = document.querySelector(".BMI-details__units");

// FUNCTIONS
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
  let minIdealWeight, maxIdealWeight;

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

function setBMIMeaningMarginTop(layoutType) {
  const viewportWidth = window.innerWidth;
  const isMobileLayout = viewportWidth < 768;
  const isTabletLayout = viewportWidth > 767 && viewportWidth < 1440;
  const isDesktopLayout = viewportWidth > 1439;

  let marginTopConfig;

  if (isMobileLayout) {
    marginTopConfig = MOBILE_MARGIN_TOP;
  } else if (isTabletLayout) {
    marginTopConfig = metricRadioBtn.checked
      ? TABLET_MARGIN_TOP_METRIC
      : TABLET_MARGIN_TOP_IMPERIAL;
  } else if (isDesktopLayout) {
    marginTopConfig = metricRadioBtn.checked
      ? DESKTOP_MARGIN_TOP_METRIC
      : DESKTOP_MARGIN_TOP_IMPERIAL;
  }

  bmiMeaning.style.marginTop = marginTopConfig[layoutType];
}

function hideBMIWelcome() {
  bmiWelcome.classList.add("hidden");
  bmiResult.classList.remove("hidden");

  setBMIMeaningMarginTop("result");
}

function displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight) {
  bmiNumber.textContent = bmi;
  let bmiParagraphHTML = "";

  if (metricRadioBtn.checked) {
    bmiParagraphHTML = `Your BMI suggests you're ${category}. Your ideal weight is between <span class="BMI-result__ideal-weight">${minIdealWeight}kgs - ${maxIdealWeight}kgs</span>.`;
  }

  if (imperialRadioBtn.checked) {
    const minWeightST = Math.floor(minIdealWeight / POUNDS_PER_STONE);
    const minWeightLBS = Math.floor(
      minIdealWeight - minWeightST * POUNDS_PER_STONE
    );
    const maxWeightST = Math.floor(maxIdealWeight / POUNDS_PER_STONE);
    const maxWeightLBS = Math.floor(
      maxIdealWeight - maxWeightST * POUNDS_PER_STONE
    );
    const minWeightUnitLabel = minWeightLBS === 1 ? "lb" : "lbs";
    const maxWeightUnitLabel = maxWeightLBS === 1 ? "lb" : "lbs";

    bmiParagraphHTML = `Your BMI suggests you're ${category}. Your ideal weight is between <span class="BMI-result__ideal-weight">${minWeightST}st ${minWeightLBS}${minWeightUnitLabel} - ${maxWeightST}st ${maxWeightLBS}${maxWeightUnitLabel}</span>.`;
  }

  bmiParagraph.innerHTML = bmiParagraphHTML;

  hideBMIWelcome();
}

function displayBMIWelcome(measurements) {
  const { heightCM, weightKG, heightFT, heightIN, weightST, weightLBS } =
    measurements;

  const allMetricInputsEmpty = !heightCM && !weightKG;
  const allImperialInputsEmpty =
    !heightFT && !heightIN && !weightST && !weightLBS;

  const shouldDisplayBMIWelcome =
    (metricRadioBtn.checked && allMetricInputsEmpty) ||
    (imperialRadioBtn.checked && allImperialInputsEmpty);

  if (shouldDisplayBMIWelcome) {
    bmiResult.classList.add("hidden");
    bmiWelcome.classList.remove("hidden");

    setBMIMeaningMarginTop("welcome");
  }
}

function clearMeasurementInputs() {
  if (imperialRadioBtn.checked) {
    metricHeightInput.value = "";
    metricWeightInput.value = "";
  }

  if (metricRadioBtn.checked) {
    imperialFeetInput.value = "";
    imperialInchesInput.value = "";
    imperialStoneInput.value = "";
    imperialPoundsInput.value = "";
  }
}

function toggleMeasurementsVisibility() {
  imperialMeasurements.classList.toggle("hidden");
  metricMeasurements.classList.toggle("hidden");
}

// EVENT LISTENER CALLBACK FUNCTIONS
function calculateBMI() {
  if (metricRadioBtn.checked) {
    heightCM = parseFloat(metricHeightInput.value);
    weightKG = parseFloat(metricWeightInput.value);
  }

  if (imperialRadioBtn.checked) {
    heightFT = parseFloat(imperialFeetInput.value);
    heightIN = parseFloat(imperialInchesInput.value) || 0;
    weightST = parseFloat(imperialStoneInput.value);
    weightLBS = parseFloat(imperialPoundsInput.value) || 0;
  }

  const heightInInches = heightFT * INCHES_PER_FOOT + heightIN;
  const weightInPounds = weightST * POUNDS_PER_STONE + weightLBS;

  const measurements = metricRadioBtn.checked
    ? { heightCM, weightKG }
    : { heightFT, heightIN, weightST, weightLBS };

  displayBMIWelcome(measurements);

  if (!isValidMeasurements(measurements)) return;

  let bmi;

  if (metricRadioBtn.checked) {
    bmi = (weightKG / ((heightCM * heightCM) / 10000)).toFixed(1);
  }

  if (imperialRadioBtn.checked) {
    bmi = ((weightInPounds / (heightInInches * heightInInches)) * 703).toFixed(
      1
    );
  }

  const category = categorizeBMI(bmi);
  const { minIdealWeight, maxIdealWeight } = calculateIdealWeightRange(
    metricRadioBtn.checked ? heightCM : heightInInches
  );

  displayBMIResult(bmi, category, minIdealWeight, maxIdealWeight);
}

function handleRadioBtnChange(e) {
  const radioBtn = e.target;
  const imperialBtnChecked = radioBtn.id === "imperial";
  const metricBtnChecked = radioBtn.id === "metric";

  toggleMeasurementsVisibility();
  clearMeasurementInputs();

  const viewportWidth = window.innerWidth;
  const isTabletLayout = viewportWidth > 767 && viewportWidth < 1440;
  const isDesktopLayout = viewportWidth > 1439;

  if (imperialBtnChecked) {
    displayBMIWelcome({ heightCM, weightKG });

    if (isTabletLayout || isDesktopLayout) {
      const imperialMarginTopConfig = isTabletLayout
        ? TABLET_MARGIN_TOP_IMPERIAL
        : DESKTOP_MARGIN_TOP_IMPERIAL;

      bmiMeaning.style.marginTop = imperialMarginTopConfig.welcome;
    }
  }

  if (metricBtnChecked) {
    displayBMIWelcome({ heightFT, heightIN, weightST, weightLBS });
  }
}

let isMobileLayoutDisplayed = false;
let isTabletLayoutDisplayed = false;
let isDesktopLayoutDisplayed = false;

function handleViewportResize() {
  const viewportWidth = window.innerWidth;
  const isMobileLayout = viewportWidth < 768;
  const isTabletLayout = viewportWidth > 767 && viewportWidth < 1440;
  const isDesktopLayout = viewportWidth > 1439;
  const isBMIResultDisplayed = !bmiResult.classList.contains("hidden");
  const isBMIWelcomeDisplayed = !bmiWelcome.classList.contains("hidden");

  const layouts = [
    {
      condition: isMobileLayout,
      marginTopConfig: MOBILE_MARGIN_TOP,
      isDisplayed: isMobileLayoutDisplayed,
    },
    {
      condition: isTabletLayout,
      marginTopConfig: metricRadioBtn.checked
        ? TABLET_MARGIN_TOP_METRIC
        : TABLET_MARGIN_TOP_IMPERIAL,
      isDisplayed: isTabletLayoutDisplayed,
    },
    {
      condition: isDesktopLayout,
      marginTopConfig: metricRadioBtn.checked
        ? DESKTOP_MARGIN_TOP_METRIC
        : DESKTOP_MARGIN_TOP_IMPERIAL,
      isDisplayed: isDesktopLayoutDisplayed,
    },
  ];

  layouts.forEach((layout) => {
    if (layout.condition && !layout.isDisplayed) {
      isMobileLayoutDisplayed = layout.condition === isMobileLayout;
      isTabletLayoutDisplayed = layout.condition === isTabletLayout;
      isDesktopLayoutDisplayed = layout.condition === isDesktopLayout;

      if (isBMIResultDisplayed || isBMIWelcomeDisplayed) {
        bmiMeaning.style.marginTop = isBMIResultDisplayed
          ? layout.marginTopConfig.result
          : layout.marginTopConfig.welcome;
      }
    }
  });
}

// EVENT LISTENERS

// Attach input event listeners to metric inputs
metricHeightInput.addEventListener("input", calculateBMI);
metricWeightInput.addEventListener("input", calculateBMI);

// Attach input event listeners to imperial inputs
imperialFeetInput.addEventListener("input", calculateBMI);
imperialInchesInput.addEventListener("input", calculateBMI);
imperialStoneInput.addEventListener("input", calculateBMI);
imperialPoundsInput.addEventListener("input", calculateBMI);

// Attach change event listener to radio container
radioContainer.addEventListener("change", handleRadioBtnChange);

// Attach resize event listener to window
window.addEventListener("resize", handleViewportResize);
