const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  add,
  update,
  updateStatusContact,
  remove,
} = require("../../controllers/contacts");

const schema = require("../../schemas/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(schema.addSchema), add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schema.updateSchema),
  update
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  updateStatusContact
);

router.delete("/:id", authenticate, isValidId, remove);

module.exports = router;
