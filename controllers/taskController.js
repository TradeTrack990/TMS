const Task = require('../models/Task');
const User = require('../models/User');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
  
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};

exports.startTask = async (req, res) => {
  try {
    const images = req.files.map(file => file.filename);
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        startImages: images,
        status: 'in_progress',
        startDate: new Date()
      },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Start task failed', error: err });
  }
};

exports.endTask = async (req, res) => {
  try {
    const images = req.files.map(file => file.filename);
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        endImages: images,
        status: 'completed_by_user',
        endDate: new Date()
      },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'End task failed', error: err });
  }
};

exports.finishTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: 'finished_by_admin',
        finishedDate: new Date()
      },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Finish task failed', error: err });
  }
};


exports.getTasksByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const tasks = await Task.find({ assignedTo: user._id });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};