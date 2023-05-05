const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  add,
  update,
  remove,
} = require("../../controllers/contacts");

const schema = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", validateBody(schema.addSchema), add);

router.put("/:id", validateBody(schema.addSchema), update);

router.delete("/:id", remove);

module.exports = router;
