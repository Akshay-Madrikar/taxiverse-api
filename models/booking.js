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
    vehicle: { type: ObjectId, ref: "Vehicle" },
    user: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
