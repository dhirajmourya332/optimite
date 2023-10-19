const Task = require("../models/Task");

// handler to get all the tasks of the user
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(
      { user: req.userId },
      "title description dueDate status"
    );
    res.json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      dueDateNotified: false,
      user: req.userId,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    //check if requestId is in req params
    const { id } = req.params.id;
    if (!id) {
      res.json({ error: "No task id was found in the url" });
    }

    const result = await Task.findByIdAndUpdate(id, {
      title,
      description,
      status,
      dueDate,
    });
    if (result) res.json({ message: "Task updated successfully" });
    else res.json({ error: "no document found with given id" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    //check if requestId is in req params
    const { id } = req.params.id;
    if (!id) {
      res.json({ error: "No task id was found in the url" });
    }
    const result = await Task.findByIdAndDelete(req.params.id);
    if (result) res.json({ message: "Task deleted successfully" });
    else res.json({ error: "no document found with given id" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
