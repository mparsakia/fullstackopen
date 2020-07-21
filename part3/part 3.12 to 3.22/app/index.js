// ******************************************************************
// FullStackOpen Part 3 -- Assignments (Phonebook)
// ******************************************************************

// express.json() use case:
// https://fullstackopen.com/en/part3/node_js_and_express#receiving-data
// app.use(cors()) use case:
// https://fullstackopen.com/en/part3/deploying_app_to_internet#same-origin-policy-and-cors
// app.use(morgan('tiny')): Morgan is a http middleware, we use it for logging http requests.
// express.static('build') use case:
// https://fullstackopen.com/en/part3/deploying_app_to_internet#serving-static-files-from-the-backend
// The order of middleware loading is important! see link below:
// https://fullstackopen.com/en/part3/saving_data_to_mongo_db#moving-error-handling-into-middleware


require("dotenv").config();
const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("build"));


const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("-------------");
  next();
};

app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/", (req, res) => {
  res.send("<h1>Phonebook Server...</h1>");
});

app.get("/info", (req, res) => {
  let totalentries = Person.length;
  let calltime = new Date();
  res.send(
    `<h1>Phonebook Server Info</h1> 
    <p>Phonebook has ${totalentries} people.</p> 
    <p>${calltime}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(pers => {
    response.json(pers);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then(pers => {
    if(pers){
      response.json(pers);
    } else {
      response.status(404).end();
    }
  }).catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const newPersonObj = new Person ({
    name: body.name,
    number: body.number,
  });

  /**
 * --- Promise chaining ---
 * First we recieved the savedPerson obj returned by Mongoose and format it with toJSON.
 * The result of the operation is returned. ->
 * The then method of a promise also returns a promise.
 * We can access the formattedPerson by registering a new callback function w/ the then method.
 * We can even make this shorter with arrow functions, but I will leave it like this for clarity.
 *
 * In this case promise chaining does not provide much benefit, however it would provide
 * a great benefit if we had many asynchronous operations that must be done in sequence!
 */

  newPersonObj.save()
    .then(savedPerson => {
      return savedPerson.toJSON();
    })
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson);
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});


// update a name in the phonebook
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const personObj = { name: body.name, number: body.number };

  Person.findByIdAndUpdate(request.params.id, personObj, { new:true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    }).catch(error => next(error));
});

/** -----  Note about app.put function for updating a person, from FSO note app -----
 * There is one important detail regarding the use of the findByIdAndUpdate method.
 * By default, the updatedNote parameter of the event handler receives the original
 * document without the modifications. We added the optional { new: true } parameter,
 * which will cause our event handler to be called with the new modified document
 * instead of the original.
 * https://fullstackopen.com/en/part3/saving_data_to_mongo_db#other-operations
 */

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if(error.name === "ValidationError"){
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});