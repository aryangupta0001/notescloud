const connectToMongo = require("./db");

connectToMongo();

const express = require('express')

const app = express()
const port = 3000

app.use(express.json());        // Use this middleware to use parse incoming requests with JSON Payload.

// Available Routes :-
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Link :- http://localhost:${port}`)
})