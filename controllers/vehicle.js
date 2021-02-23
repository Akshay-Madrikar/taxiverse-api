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
    const {
      name,
      imageUrl,
      fuelType,
      price,
      fuelChecklist,
      availableFrom,
      availableTo,
    } = formData;
    if (!name || !price || !availableFrom || !availableTo) {
      return res.status(400).json({
        error:
          "Name, price, availableFrom and availableTo type fields are required!",
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

exports.update = async (req, res) => {
  let vehicleFields = {};
  try {
    const { formData } = req.body;
    if (formData) {
      const {
        name,
        imageUrl,
        fuelType,
        price,
        fuelChecklist,
        availableFrom,
        availableTo,
      } = formData;

      if (name) vehicleFields.name = name;
      if (imageUrl) vehicleFields.imageUrl = imageUrl;
      if (fuelType) vehicleFields.fuelType = fuelType;
      if (price) vehicleFields.price = price;
      if (fuelChecklist) vehicleFields.fuelChecklist = fuelChecklist;
      if (availableFrom) vehicleFields.availableFrom = availableFrom;
      if (availableTo) vehicleFields.availableTo = availableTo;
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.vehicle._id,
      {
        $set: vehicleFields,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      vehicle,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const vehicle = req.vehicle;
    await vehicle.remove();
    res.status(200).json({
      vehicle,
      message: "Vehicle deleted successfully!",
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

    res.status(201).json({ vehicles });
  } catch (error) {
    res.status(400).json({
      error: "Vehicles not found",
    });
  }
};
