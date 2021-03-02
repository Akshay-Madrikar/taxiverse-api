const Booking = require("../models/booking");
const Location = require("../models/location");
const { sendBookingEmail } = require("../emails/account");

exports.bookingById = async (req, res, next, id) => {
  try {
    const booking = await Booking.findById(id)
      .populate("user")
      .populate("vehicle")
      .populate("location")
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

exports.read = async (req, res) => {
  return res.status(200).json(req.booking);
};

exports.create = async (req, res) => {
  try {
    const { no_of_partners, startDate, endDate } = req.body.bookingData;
    const { price } = req.vehicle;
    const { distance } = req.location;

    const booking = new Booking({
      partnersCount: no_of_partners,
      bookedFrom: startDate,
      bookedTo: endDate,
      amount: Math.round(price * distance * 100) / 100,
      vehicle: req.vehicle,
      user: req.profile,
      location: req.location,
    });

    sendBookingEmail(req.profile.email, booking);
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({
      error: "Cannot book this vehicle!",
    });
  }
};

exports.createLocation = async (req, res, next) => {
  try {
    const { locationData } = req.body.bookingData;

    const location = new Location({
      source: {
        lat: locationData.source.lat,
        lng: locationData.source.lng,
      },
      destination: {
        lat: locationData.destination.lat,
        lng: locationData.destination.lng,
      },
      distance: locationData.distance,
      duration: locationData.duration,
    });
    await location.save();
    req.location = location;

    next();
  } catch (error) {
    res.status(400).json({
      error: "Cannot create location data",
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
      .populate("user")
      .populate("vehicle")
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

exports.processPayment = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.body.bookingId,
      {
        $set: {
          status: 1,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({
      error: "Could not update bookable feature!",
    });
  }
};
