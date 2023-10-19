const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(bodyParser.json());

//connect to mongoodb database
//TODO seprate this step from this file and add proper error handler
mongoose.connect(process.env.MONGODB_CONNECTION_URI);

//router for /auth endpoint
app.use("/auth", authRoutes);

module.exports = app;
