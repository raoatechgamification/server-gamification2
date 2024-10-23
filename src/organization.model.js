const mongoose = require('mongoose');

const { Schema } = mongoose;


const organizationSchema = new Schema({
  name: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String},
  email: { type: String, required: true, unique: true }, 
  phone: { type: String },
  preferredUrl: { type: String },
  referral: { type: String },
  referralSource: { type: String },
  industry: { type: String },
  password: { type: String, required: true }, 
  role: { type: String, default: 'admin', required: true }, 
}, {
  timestamps: true, 
});

const organization = mongoose.model('Organization', organizationSchema);

module.exports = organization;
