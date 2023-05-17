const User = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const getInfo = async (req, res) => {
  const { user } = req;
  const { email, contacts } = user;

  res.json({ email, contacts });
};

const getContacts = async (req, res) => {
  const { user } = req;

  const userContacts = await User.findById(user._id).populate("contacts", {
    name: 1,
    email: 1,
    phone: 1,
  });

  res.json({ contacts: userContacts.contacts });
};

const addContact = async (req, res) => {
  const { user } = req;
  const { id: contactId } = req.body;

  user.contacts.push({ _id: contactId });

  await User.findByIdAndUpdate(user._id, user);

  res.json({ contacts: user.contacts });
};

module.exports = {
  getInfo: ctrlWrapper(getInfo),
  getContacts: ctrlWrapper(getContacts),
  addContact: ctrlWrapper(addContact),
};
