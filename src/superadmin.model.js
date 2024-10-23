const mongoose = require('mongoose');

const { Schema } = mongoose;


const SuperAdminSchema = new Schema(
  {
    username: {
      type: String,
      default: null, 
    },
    email: {
      type: String,
      required: true, 
      unique: true, 
    },
    firstName: {
      type: String,
      default: null, 
    },
    lastName: {
      type: String,
      default: null, 
    },
    role: {
      type: String,
      default: 'superAdmin', 
      required: true, 
    },
    password: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true, 
  }
);

const SuperAdmin = mongoose.model('SuperAdmin', SuperAdminSchema);

module.exports = SuperAdmin;
