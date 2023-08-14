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

export { categorizeBMI };
