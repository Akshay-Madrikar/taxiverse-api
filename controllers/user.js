const User = require("../models/user");
const { sendBlockEmail, sendUnblockEmail } = require("../emails/account");

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
      locationData: req.location,
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

exports.list = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new Error();
    }

    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({
      error: "Users not found",
    });
  }
};

exports.block = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          block_status: 1,
        },
      },
      {
        new: true,
      }
    );

    sendBlockEmail(user.email);

    res.status(200).json({
      _id: user._id,
      block_status: user.block_status,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.unblock = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          block_status: 0,
        },
      },
      {
        new: true,
      }
    );

    sendUnblockEmail(user.email);

    res.status(200).json({
      _id: user._id,
      block_status: user.block_status,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
