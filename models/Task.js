const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startImages: [String],
  satrtDate: Date,
  endDate: Date,
  finishedDate: Date,
  endImages: [String],
  status: { type: String, enum: ['not_started', 'in_progress', 'completed_by_user', 'finished_by_admin'], default: 'not_started' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
