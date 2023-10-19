const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

//body parser middlewar to parse the json body of requests
app.use(bodyParser.json());

//connect to the mongodb database
//TODO seprate this in seprate file with error handling logic
mongoose.connect(process.env.MONGODB_CONNECTION_URI);

//middleware to authenticate user request
app.use(authMiddleware);

//pass the /tasks... requests to raskRoutes
app.use("/tasks", taskRoutes);

module.exports = app;
