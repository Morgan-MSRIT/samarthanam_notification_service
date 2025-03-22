const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  emailNotifAllow: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'volunteer', 'organiser'],
    default: 'volunteer'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

// User
// Id : primary key string
// Name : string
// Age : number
// Email : unique string
// Phone : number
// Address : string
// Nationality : string 
// Email_notif_allow : bool
// Password : string
// Role: enum (admin, volunteer, organiser)
// Tags: foreign key array