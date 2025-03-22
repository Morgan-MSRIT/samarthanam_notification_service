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
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isRegistrationRequired: {
    type: Boolean,
    default: true
  },
  registeredParticipants: [{
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
  totalVolunteerReq: {
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