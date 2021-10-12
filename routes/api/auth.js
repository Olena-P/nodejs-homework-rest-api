const express = require("express");
const router = express.Router();
const { joiUserSchema } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");

router.post(
  "/signup",
  validation(joiUserSchema),
  controllerWrapper(ctrl.signup)
);

router.post("/login", validation(joiUserSchema), controllerWrapper(ctrl.login));

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));
router.get("/current", authenticate, controllerWrapper(ctrl.current));

module.exports = router;
