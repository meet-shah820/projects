const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks / create task POST
router.route('/').get(async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    console.error('GET tasks error:', err);
    res.status(500).json({ msg: err.message, error: process.env.NODE_ENV === 'development' ? err.stack : undefined });
  }
}).post(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ msg: 'Please provide task name' });
  }
  try {
    const task = await Task.create({ name });
    res.status(201).json({ task });
  } catch (err) {
    console.error('POST task error:', err);
    res.status(400).json({ msg: err.message, error: process.env.NODE_ENV === 'development' ? err.stack : undefined });
  }
});

// Single task
router.route('/:id').get(async (req, res) => {
  const taskID = req.params.id;
  if (!taskID || taskID === 'undefined') {
    return res.status(400).json({ msg: 'Invalid task ID' });
  }
  try {
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    console.error(`GET task ${taskID} error:`, err);
    res.status(500).json({ msg: err.message, error: process.env.NODE_ENV === 'development' ? err.stack : undefined });
  }
}).patch(async (req, res) => {
  const taskID = req.params.id;
  if (!taskID || taskID === 'undefined') {
    return res.status(400).json({ msg: 'Invalid task ID' });
  }
  try {
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    console.error(`PATCH task ${taskID} error:`, err);
    res.status(400).json({ msg: err.message, error: process.env.NODE_ENV === 'development' ? err.stack : undefined });
  }
}).delete(async (req, res) => {
  const taskID = req.params.id;
  if (!taskID || taskID === 'undefined') {
    return res.status(400).json({ msg: 'Invalid task ID' });
  }
  try {
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` });
    }
    res.status(200).json({ msg: 'Success! Task removed' });
  } catch (err) {
    console.error(`DELETE task ${taskID} error:`, err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
