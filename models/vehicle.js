const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    imageUrl: {
      type: String,
      default: "https://www.shopsmartautos.com/media/default-car.png",
    },
    fuelType: {
      type: String,
      default: "Petrol",
    },
    price: {
      type: Number,
      default: 0,
    },

    fuelChecklist: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
