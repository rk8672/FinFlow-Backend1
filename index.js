require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());


const dataConnection = require("./config/db.js");
dataConnection();

// const main = require("./routes/index.js");
// app.use('/', main);

app.get('/', (req, res) => {
    res.send("Hello from express.js");
})

//Index Route
const main = require("./routes/index.js");
app.use('/', main);

const port = process.env.PORT || 10000; 

app.listen(port, () => {
    console.log(` Radha Krishna Server is up and running on ${port}`)
})
