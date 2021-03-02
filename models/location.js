const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const LocationSchema = new mongoose.Schema(
  {
    source: {
      type: Object,
      default: {
        lat: "",
        lng: "",
      },
    },
    destination: {
      type: Object,
      default: {
        lat: "",
        lng: "",
      },
    },
    distance: {
      type: Number,
    },
    duration: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
