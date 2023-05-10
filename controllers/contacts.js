const Contact = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw HttpError(404, "Not Found");
  }

  res.json(contact);
};

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
};

const update = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!contact) {
    throw HttpError(404, "Not Found");
  }

  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!contact) {
    throw HttpError(404, "Not Found");
  }

  res.json(contact);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);

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
  updateStatusContact: ctrlWrapper(updateStatusContact),
  remove: ctrlWrapper(remove),
};
