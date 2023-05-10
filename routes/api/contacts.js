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
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", validateBody(schema.addSchema), add);

router.put("/:id", isValidId, validateBody(schema.updateSchema), update);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  updateStatusContact
);

router.delete("/:id", isValidId, remove);

module.exports = router;
