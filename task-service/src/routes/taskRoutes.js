// task-service/src/routes/taskRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

//middleware to authenticate user
router.use(authMiddleware);

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
