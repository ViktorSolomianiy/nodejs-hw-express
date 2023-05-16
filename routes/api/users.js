const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/users");
const { validateBody, authenticate } = require("../../middlewares");
// const schema = require("../../schemas/auth");
// const { validateBody, authenticate } = require("../../middlewares");

router.get("/info", authenticate, ctrl.getInfo);

router.get("/contacts", authenticate, ctrl.getContacts);

router.post("/", authenticate, ctrl.addContact);

module.exports = router;
