const Vehicle = require("../models/vehicle");

exports.vehicleById = async (req, res, next, id) => {
  try {
    const vehicle = await Vehicle.findById(id).exec();
    if (!vehicle) {
      throw new Error();
    }
    req.vehicle = vehicle;
    next();
  } catch (error) {
    res.status(404).json({
      error: "No such vehicle!",
    });
  }
};

exports.read = async (req, res) => {
  return res.status(200).json({ vehicle: req.vehicle });
};

exports.create = async (req, res) => {
  try {
    const { formData } = req.body;
    const { name, imageUrl, fuelType, price, fuelChecklist } = formData;
    if (!name || !price) {
      return res.status(400).json({
        error: "Name and Price type fields are required!",
      });
    }

    const vehicle = new Vehicle({
      name,
      imageUrl,
      fuelType,
      price,
      fuelChecklist,
    });
    await vehicle.save();
    res.status(201).json({
      vehicle,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.listAll = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    if (!vehicles) {
      throw new Error();
    }

    res.status(201).json(vehicles);
  } catch (error) {
    res.status(400).json({
      error: "Vehicles not found",
    });
  }
};
