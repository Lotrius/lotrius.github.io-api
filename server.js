const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const transporter = require("./controller/transporter");

const app = express(); // So we can have a server going

app.use(bodyParser.json()); // So we can get form data
app.use(cors()); // To connect front and back end

// Endpoint for sending mail
app.post("/send", (req, res) => {
  transporter
    .send(req)
    .then((rep) => res.json("Success"))
    .catch((err) => console.log("nope"));
});

// Upset cause not exactly "authorized" app
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// We are on port 3000 currently
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${listener.address().port}!`);
});
