const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  status: {
  type: String,
  enum: ["Pending", "Approved", "Rejected"],
  default: "Pending",
},

  // ADD HERE 👇

  location: {
    type: String
  },

  skills: {
    type: String
  },

  duration: {
    type: String
  },

  latitude: {
    type: Number
  },

  longitude: {
    type: Number
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "Service",
  serviceSchema
);