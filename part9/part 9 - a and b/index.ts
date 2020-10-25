import express from "express";
import { calculateBMI } from "./bmiCalcFunction";
import { workoutCalc } from "./exerCalcFunc";

const app = express(); // https://reactgo.com/express-req-body-undefined/
app.use(express.json()); // must have this or req.body will be undefined

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const params = {
    weight: Number(req.query.weight),
    height: Number(req.query.height),
  };

  const errorObj = {
    error: "malformatted params",
  };

  if (isNaN(params.weight) || isNaN(params.height)) {
    res.status(500).send(JSON.stringify(errorObj));
  } else {
    const response = calculateBMI(params.weight, params.height);
    res.send(response);
  }
}); // send request with: http://localhost:3003/bmi?height=180&weight=72

app.post("/exercises", (req, res) => {
  const errorObj = {
    missing: "parameters missing",
    malformatted: "malformatted params",
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body == undefined || !req.body.target || !req.body.daily_exercises) {
    res.status(500).send(JSON.stringify(errorObj.missing));
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const daily_exercises = Array(...req.body.daily_exercises);

  if (isNaN(target) || daily_exercises.length === 0) {
    res.status(500).send(JSON.stringify(errorObj.malformatted));
  }

  res.status(200).send(JSON.stringify(workoutCalc(daily_exercises, target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// NOTE: Query param url string format:
// GET /search?q=tobi+ferret
// req.query.q // => "tobi ferret"
// https://devhints.io/express
