const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  max_volunteer_needed: {
    type: Number,
    default: 1
  },
  current_volunteer_count: {
    type: Number,
    default: 0
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
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
