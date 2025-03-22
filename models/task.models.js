const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  maxVolunteerNeeded: {
    type: Number,
    default: 1
  },
  currentVolunteerCount: {
    type: Number,
    default: 0
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);


// Task
// Id : primary key string
// Name : string
// End time: datetime
// Start time: datetime
// Max_volunteer_needed: num
// Current_volunteer_count: num
