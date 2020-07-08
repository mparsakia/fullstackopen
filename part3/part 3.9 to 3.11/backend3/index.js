// FullStackOpen Part 3 -- Assignment 3.1 to 3.7

const express = require("express");
var morgan = require('morgan');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};


let persons = [
  {
    name: "Mike P",
    number: "152-74774-544",
    id: 1,
  },
  {
    name: "C Babbage",
    number: "88-0254-001",
    id: 2,
  },
  {
    name: "Ayy Ob",
    number: "3423452354",
    id: 3,
  },
  {
    name: "Jay One",
    number: "222-233234",
    id: 4,
  },
  {
    name: "Yo Abram",
    number: "11-55-4-7888",
    id: 5,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Phonebook Server</h1>");
});

app.get("/info", (req, res) => {
  let totalentries = persons.length;
  let calltime = new Date(); 
  res.send(
    `<h1>Phonebook Server Info</h1> 
    <p>Phonebook has ${totalentries} people.</p> 
    <p>${calltime} </p>`
    );
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(pers => pers.id !== id)
  response.status(204).end()
})

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const checkDuplicate = persons.find(pers => pers.name === String(body.name));

  if (checkDuplicate !== undefined) {
    return response.status(400).json({ 
      error: 'duplicate name entry' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  response.json(person)
})


app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

