const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String, default: null, },
    lastName: { type: String, default: null, },
    email: { type: String, required: true, unique: true, },
    phone: { type: String, default: null, },
    organization: { type: mongoose.Schema.Types.ObjectId, default: null, },
    role: { type: String, default: "user", required: true, },
    password: { type: String, required: true, },
    yearOfExperience: { type: Number, default: null, },
    highestEducationLevel: { type: String, default: null, },
    gender: { type: String, default: null, },
    dateOfBirth: { type: String, default: null, },
  }, {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
