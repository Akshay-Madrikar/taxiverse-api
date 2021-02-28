const express = require("express");
const { userById, addBookingToUserHistory } = require("../controllers/user");
const { vehicleById } = require("../controllers/vehicle");
const { requiredSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  bookingById,
  create,
  cancelBooking,
  listBookings,
  listAllBookings,
} = require("../controllers/booking");

const router = express.Router();

router.post(
  "/booking/create/:vehicleId/:userId",
  requiredSignin,
  isAuth,
  addBookingToUserHistory,
  create
);
router.delete(
  "/booking/:bookingId/:userId",
  requiredSignin,
  isAuth,
  cancelBooking
);
router.get("/booking/list/:userId", requiredSignin, isAuth, listBookings);
router.get(
  "/booking/list/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  listAllBookings
);

router.param("userId", userById);
router.param("vehicleId", vehicleById);
router.param("bookingId", bookingById);

module.exports = router;
