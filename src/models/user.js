const mongoose = require("mongoose");


const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name']
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,      
    },

    password: String,
    
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', User);