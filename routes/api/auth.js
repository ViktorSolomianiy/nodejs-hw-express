const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const schema = require("../../schemas/auth");
const { validateBody, authenticate } = require("../../middlewares");

router.post("/users/register", validateBody(schema.authSchema), ctrl.register);

router.post("/users/login", validateBody(schema.authSchema), ctrl.login);

router.get("/users/current", authenticate, ctrl.getCurrent);

router.get("/users/logout", authenticate, ctrl.logout);

router.patch(
  "/users",
  authenticate,
  validateBody(schema.subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
