const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/taskService", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(authMiddleware);
app.use("/tasks", taskRoutes);

module.exports = app;
