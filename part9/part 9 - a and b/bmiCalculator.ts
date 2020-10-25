import calculateBMI from "./bmiCalcFunction";

interface BMICalc {
  heightCm: number;
  weightKg: number;
}

const parseArguments = (args: Array<string>): BMICalc => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weightKg: Number(args[3]),
      heightCm: Number(args[2]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { weightKg, heightCm } = parseArguments(process.argv);
  calculateBMI(weightKg, heightCm);
} catch (e) {
  console.log("Error at bmiCalculator.ts try/catch");
}
