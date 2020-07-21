// ******************************************************************
// Backend 3 Code -- CLI MongooDB Interface w Mongoose
// Run command: node mongo.js <password> -- prints db to console
// node mongo.js <password> "Arto Vihavainen" 045-1232456 -- adds to db
// ******************************************************************

const mongoose = require("mongoose");

if (process.argv.length == 2) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];

// The specific URL of the databae we need -- 'phonebookdb' gets created on first run with the request
const url =
`mongodb+srv://mikep17:${password}@cluster0.qjigu.mongodb.net/phonebookdb?retryWrites=true&w=majority`;

// Define the person data schema for Mongoose
const personSchema = new mongoose.Schema({
  name:String,
  number:String,
});

// Associate the schema with a model.
const Person = mongoose.model("Person", personSchema);


// PRINT ALL IN DATABASE
if (process.argv.length == 3) {
  console.log("printing database: \n");

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  Person.find({}).then((result) => {
    result.forEach((per) => {
      console.log(per);
    });
    mongoose.connection.close();
  });
}


// ADD TO DATABASE
if (process.argv.length == 5) {
  console.log("adding to database... \n");

  // Place arguments into variables with names (not neccesary -- but helps readability)
  const entryname = process.argv[3];
  const entrynumber = process.argv[4];

  // Now we create the object via the schema defined
  const person = new Person({
    name: entryname,
    number: entrynumber,
  });

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  // Send the object over to the database (or "document" in this case)
  person.save().then((result) => {
    console.log("person saved! logging result: ");
    console.log(result);
    mongoose.connection.close();
  });
}





// -----  NOTES -----
// We could restrict our search to only include important notes like this:
// Note.find({ important: true }).then(result => {
//   // ...
// })

// Remember to close the connections in the right place!
// If we close outside of the callback, we may lock up the program!

// person.save().then((result) => {
//   console.log("person saved! logging result:");
//   console.log(result);
//   mongoose.connection.close();     // THIS IS THE RIGHT PLACE TO CLOSE THE CONNECTION.
// });
