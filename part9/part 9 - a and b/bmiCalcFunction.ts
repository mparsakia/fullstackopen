export const calculateBMI = (kg: number, cm: number): string => {
  const result = Number((kg / Math.pow(cm / 100, 2)).toPrecision(4));
  console.log("BMI Result calculated: ", result);

  const responseObject = {
    weight: kg,
    height: cm,
    bmi: "Default",
    calulatedBMI: result,
  };

  if (result >= 30) {
    responseObject.bmi = "Obesity";
    return JSON.stringify(responseObject);
  } else if (result < 30 && result >= 25) {
    responseObject.bmi = "Overweight";
    return JSON.stringify(responseObject);
  } else if (result < 25 && result > 18.5) {
    responseObject.bmi = "Normal";
    return JSON.stringify(responseObject);
  } else if (result <= 18.5) {
    responseObject.bmi = "Underweight";
    return JSON.stringify(responseObject);
  } else {
    return "error in BMI calculation function:";
  }
};

export default calculateBMI;
