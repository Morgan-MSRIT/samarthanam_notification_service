const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  location: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  is_registration_required: {
    type: Boolean,
    default: true
  },
  registered_participants: [{
    type: String
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  volunteers: [{
    type: Schema.Types.ObjectId,
    ref: 'Volunteer'
  }],
  total_volunteer_req: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);


// Event
// Id : primary key string
// Name : string
// Description : string
// Tag : foreign key tag array
// Location : string
// Start date : datetime
// End date : datetime
// Is_resgistration_required : bool
// Registered_participants : array string
// Tasks : foreign key task array
// Volunteers : foreign key volunteer array 
// Total_volunteer_req: num
