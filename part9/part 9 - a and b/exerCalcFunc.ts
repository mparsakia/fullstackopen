interface WorkoutResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const workoutCalc = (
  workoutArray: Array<number>,
  target: number
): WorkoutResult => {
  const reducer = (acc: number, curr: number) => Number(acc) + Number(curr);
  const totalHours = Number(workoutArray.reduce(reducer));

  const periodLength = workoutArray.length;
  const trainingDays = workoutArray.filter((day) => day != 0).length;
  const averageHours = totalHours / periodLength;

  let rating = 0;
  let ratingDescription = "";
  let success = false;

  switch (true) {
    case averageHours >= target: {
      rating = 3;
      ratingDescription = "Excellent, you met or exceeded the target.";
      success = true;
      break;
    }
    case averageHours < target: {
      rating = 2;
      ratingDescription = "Under target, but not by more than half.";
      success = true;
      break;
    }
    case averageHours < Number(target) / 2: {
      rating = 1;
      ratingDescription = "Needs some improvement!";
      success = false;
      break;
    }
    default:
      throw console.log("Error in the switch statement");
  }

  const resultObj = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageHours,
  };

  return resultObj;
};

export default workoutCalc;
