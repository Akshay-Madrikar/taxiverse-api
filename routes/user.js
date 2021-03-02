const express = require("express");

const {
  userById,
  readProfile,
  list,
  block,
  unblock,
} = require("../controllers/user");
const { requiredSignin, isAuth, isAdmin } = require("../controllers/auth");

const router = express.Router();

//--------- Authentication and Authorization check ---------
router.get("/test/:userId", requiredSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/users/all/:userId", requiredSignin, isAuth, isAdmin, list);
router.get("/user", requiredSignin, isAuth, readProfile);
router.put(
  "/block/user/:userId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  block
);
router.put(
  "/unblock/user/:userId/:userId",
  requiredSignin,
  isAuth,
  isAdmin,
  unblock
);

router.param("userId", userById);

module.exports = router;
