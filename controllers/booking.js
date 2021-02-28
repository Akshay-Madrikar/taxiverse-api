const Booking = require("../models/booking");

exports.bookingById = async (req, res, next, id) => {
  try {
    const booking = await Booking.findById(id)
      .populate('user', 'email role')
      .populate('vehicle', '_id name')
      .exec();

    if (!booking) {
      throw new Error();
    }

    req.booking = booking;
    next();
  } catch (error) {
    res.status(400).json({
      error: "No such booking!",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { no_of_partners, startDate, endDate } = req.body.bookingData;

    const booking = new Booking({
      partnersCount: no_of_partners,
      bookedFrom: startDate,
      bookedTo: endDate,
      vehicle: req.vehicle,
      user: req.profile,
    });
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({
      error: "Cannot book this vehicle!",
    });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = req.booking;
    await booking.remove();
    res.status(200).json({
      booking,
      message: "Booking cancelled successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.profile._id,
    })
      .populate('user')
      .populate('vehicle')
      .exec();
    res.status(201).json(bookings);
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.listAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "_id email role")
      .populate("vehicle", "_id name")
      .exec();
    res.status(201).json(bookings);
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
