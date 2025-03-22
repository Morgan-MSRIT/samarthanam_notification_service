const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  contactHours: {
    type: Number
  },
  volunteerOrParticipationExperience: {
    type: Number
  },
  websiteExperience: {
    type: Number
  },
  experienceWorkingWithOrg: {
    type: Number
  },
  additionalInfo: {
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