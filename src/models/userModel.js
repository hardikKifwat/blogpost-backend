const mongoose = require("mongoose");

// User Schema definition
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true, // Ensures that any extra spaces are trimmed from the name
    },
    email: {
      type: String,
      unique: true,
      lowercase: true, // Automatically converts the email to lowercase before saving
      trim: true, // Trims leading/trailing spaces from the email
      validate: {
        validator: function (v) {
          // Simple regex to validate email format
          return /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          // Simple regex to validate phone number format
          return /^[0-9]{10}$/.test(v); // Ensures it's a 10-digit number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware to automatically format email and phone number before saving
UserSchema.pre("save", function (next) {
  // Convert email to lowercase and trim spaces from fullName and phoneNumber
  this.email = this.email.toLowerCase();
  this.fullName = this.fullName.trim();
  this.phoneNumber = this.phoneNumber.trim();
  next();
});

module.exports = mongoose.model("User", UserSchema);
