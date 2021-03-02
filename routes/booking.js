const express = require("express");
const { userById, addBookingToUserHistory } = require("../controllers/user");
const { vehicleById, changeBookableStatus } = require("../controllers/vehicle");
const { requiredSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  bookingById,
  create,
  read,
  createLocation,
  cancelBooking,
  listBookings,
  listAllBookings,
  processPayment,
} = require("../controllers/booking");

const router = express.Router();

router.get("/booking/:bookingId", read);
router.post(
  "/booking/create/:vehicleId/:userId",
  requiredSignin,
  isAuth,
  changeBookableStatus,
  createLocation,
  addBookingToUserHistory,
  create
);
router.put("/booking/payment/:userId", requiredSignin, isAuth, processPayment);
router.delete(
  "/booking/:bookingId/:userId",
  requiredSignin,
  isAuth,
  cancelBooking
);
router.get("/booking/list/:userId", requiredSignin, isAuth, listBookings);
router.get(
  "/booking/list-all/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  listAllBookings
);

router.param("userId", userById);
router.param("vehicleId", vehicleById);
router.param("bookingId", bookingById);

module.exports = router;
