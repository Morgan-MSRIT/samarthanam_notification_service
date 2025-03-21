const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  event_id: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  contact_hours: {
    type: Number
  },
  volunteer_or_participation_experience: {
    type: Number
  },
  website_experience: {
    type: Number
  },
  experience_working_with_org: {
    type: Number
  },
  additional_info: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);

// Feedback
// Id : primary key string
// Event_id : foreign key event 
// Contact hours : number
// Volunteer/participation_experience : number
// Website_experience : number
// Experience working with the org: number
// Additional_info : string