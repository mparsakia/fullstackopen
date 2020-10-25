import workoutCalc from "./exerCalcFunc";

const parseCLI = (args: Array<string>): Array<number> => {
  if (args.length <= 3) throw new Error("Not enough arguments");
  const tokenize = args.slice(2, args.length + 1).map(Number);
  return tokenize;
};

try {
  const parsedargs = parseCLI(process.argv);
  const target = parsedargs[0];
  const hours = parsedargs.slice(1, parsedargs.length + 1);
  const result = workoutCalc(hours, target);
  console.log(result);
} catch (e) {
  console.log("error in exerciseCalculator trycatch");
}
