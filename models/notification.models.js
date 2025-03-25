const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  type: {
    type: String,
    enum: ['allot', 'deallot', 'others'],
    default: 'allot'
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);


// Notification
// Id : primary key string
// User : foreign key string
// Event: foreign key string
// Type: enum['allot', 'deallot', 'others'] string
// Task: foreign key string
