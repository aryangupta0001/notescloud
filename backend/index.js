const connectToMongo = require("./db");
const express = require('express');
const cors = require("cors");



connectToMongo();

const PORT = 5500;
const app = express();

app.use(cors());
app.use(express.json());        // Use this middleware to parse incoming requests with JSON Payload.

// Available Routes :-
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes/", require("./routes/notes"));

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
  console.log(`Link :- http://localhost:${PORT}`);
})