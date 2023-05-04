const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    throw HttpError(404, "Not Found");
  }

  res.json(contact);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    HttpError(400, error.message);
  }

  const contact = await addContact(req.body);

  res.json(contact);
};

const update = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    HttpError(400, error.message);
  }

  const { id } = req.params;
  const contact = await updateContact(id, req.body);

  if (!contact) {
    throw HttpError(404, "Not Found");
  }

  res.json(contact);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const contact = await removeContact(id);

  if (!contact) {
    throw HttpError(404, "Not Found");
  }

  res.json({ message: "Delete success" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
};
