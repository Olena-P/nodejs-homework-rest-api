const express = require("express");
const {
  JoiSchema,
  UpdateStatusContactJoiSchema,
} = require("../../models/contact");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, controllerWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(JoiSchema),
  controllerWrapper(ctrl.add)
);

router.delete("/:contactId", authenticate, controllerWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  authenticate,
  validation(JoiSchema),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(UpdateStatusContactJoiSchema),
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
