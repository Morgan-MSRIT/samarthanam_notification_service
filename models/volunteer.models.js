const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  taskPreferred: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  taskAllocated: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  status: {
    type: String,
    enum: ['not started', 'ongoing', 'completed'],
    default: 'not started'
  },
  volunteerHrs: {
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
