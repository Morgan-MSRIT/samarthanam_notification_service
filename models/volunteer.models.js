const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task_preferred: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  task_allocated: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  status: {
    type: String,
    enum: ['not started', 'ongoing', 'completed'],
    default: 'not started'
  },
  volunteer_hrs: {
    type: Number,
    default: 0
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);

// Volunteer
// Id : primary key string
// User_id : foreign key string
// Task_preferred : foreign key task array
// Task_allocated : foreign key task array
// Status : enum (not started, ongoing, completed)
// Volunteer_hrs: num
