const express = require("express");
const router = express.Router();

const { authenticate, validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const schema = require("../../schemas/auth");

router.get("/info", authenticate, ctrl.getInfo);

router.get("/contacts", authenticate, ctrl.getContacts);

router.post("/", authenticate, ctrl.addContact);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schema.emailSchema),
  ctrl.resendVerifyEmail
);

module.exports = router;
