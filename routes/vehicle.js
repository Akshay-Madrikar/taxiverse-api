const express = require("express");
const { requiredSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  vehicleById,
  create,
  read,
  listAll,
} = require("../controllers/vehicle");
const { userById } = require("../controllers/user");

const router = express.Router();

router.post("/vehicle/create/:userId", requiredSignin, isAuth, isAdmin, create);
router.get("/vehicle/:vehicleId", read);
router.get("/vehicles/all", listAll);

router.param("userId", userById);
router.param("vehicleId", vehicleById);

module.exports = router;
