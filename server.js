const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
require("./models/db");

// rest object
const app = express();

// port
const PORT = process.env.PORT || 8080;

//  middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// static file access
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// listen
app.listen(PORT, () => {
  console.log(`Server Running on : http://localhost:${PORT}`);
});
