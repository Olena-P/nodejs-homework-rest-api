const express = require("express");
const router = express.Router();
const { joiUserSchema } = require("../../models/user");
const authController = require("../../controllers/auth");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");

router.post(
  "/signup",
  validation(joiUserSchema),
  controllerWrapper(authController.signup)
);

router.post(
  "/login",
  validation(joiUserSchema),
  controllerWrapper(authController.login)
);

router.get("/logout", authenticate, controllerWrapper(authController.logout));
router.get("/current", authenticate, controllerWrapper(authController.current));

module.exports = router;
