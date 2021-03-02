const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const BookingSchema = new mongoose.Schema(
  {
    partnersCount: {
      type: Number,
      default: 1,
    },
    bookedFrom: {
      type: Date,
    },
    bookedTo: {
      type: Date,
    },
    amount: {
      type: Number,
    },
    status: {
      type: Number,
      default: 0,
    },
    vehicle: { type: ObjectId, ref: "Vehicle" },
    user: { type: ObjectId, ref: "User" },
    location: { type: ObjectId, ref: "Location" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
