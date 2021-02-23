const express = require("express");
const { requiredSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  vehicleById,
  create,
  read,
  update,
  remove,
  listAll,
} = require("../controllers/vehicle");
const { userById } = require("../controllers/user");

const router = express.Router();

router.post("/vehicle/create/:userId", requiredSignin, isAuth, isAdmin, create);
router.get("/vehicle/:vehicleId", read);
router.put(
  "/vehicle/:vehicleId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/vehicle/:vehicleId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  remove
);
router.get("/vehicles/all", listAll);

router.param("userId", userById);
router.param("vehicleId", vehicleById);

module.exports = router;
