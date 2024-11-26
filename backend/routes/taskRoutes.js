const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Create Task
router.post('/tasks', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = new Task({ title, description, status });
    await newTask.save();
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update Task
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id, 
      { title, description, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    return res.json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Delete Task
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get All Tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
