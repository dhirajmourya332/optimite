const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  //field to store the current status of the tasks
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  //due date of the task
  dueDate: Date,
  //boolean to store wether notification is sent to user about duedate
  dueDateNotified: {
    type: Boolean,
    default: true,
  },
  //field to store user _id
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Task", taskSchema);
