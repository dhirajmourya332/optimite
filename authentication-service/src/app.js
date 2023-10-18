const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(bodyParser.json());

//connect to mongoodb database
//TODO seprate this step from this file and add proper error handler
mongoose.connect("mongodb://localhost:27017/authenticationService", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//router for /auth endpoint
app.use("/auth", authRoutes);

module.exports = app;
