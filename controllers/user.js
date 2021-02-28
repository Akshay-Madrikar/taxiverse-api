const User = require("../models/user");

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).select("-password").exec();
    if (!user) {
      throw new Error();
    }

    req.profile = user;
    next();
  } catch (error) {
    res.status(400).json({
      error: "No such user!",
    });
  }
};

exports.readProfile = async (req, res) => {
  try {
    req.profile.password = undefined;
    res.status(200).json({
      user: req.profile,
    });
  } catch (error) {
    res.status(400).json({
      error: "No such user!",
    });
  }
};

exports.addBookingToUserHistory = async (req, res, next) => {
  try {
    let history = [];

    const {
      no_of_partners,
      startDate,
      endDate,
      vehicleId,
    } = req.body.bookingData;
    history.push({
      vehicleId: vehicleId,
      partnersCount: no_of_partners,
      bookedFrom: startDate,
      bookedTo: endDate,
    });

    await User.findByIdAndUpdate(
      {
        _id: req.profile._id,
      },
      {
        $push: {
          history: history,
        },
      },
      {
        new: true,
      }
    );

    next();
  } catch (error) {
    res.status(400).json({
      error: "Could not update user booking history!",
    });
  }
};
