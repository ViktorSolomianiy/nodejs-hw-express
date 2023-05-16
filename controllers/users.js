const User = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const getInfo = async (req, res) => {
  const { user } = req;
  const { email, contacts } = user;

  res.json({ email, contacts });
};

const getContacts = async (req, res) => {
  const { user } = req;
  const { contacts } = user;

  res.json({ contacts });
};

const addContact = async (req, res) => {
  const { user } = req;
  const { contacts } = user;
  const { id: contactId } = req.body;

  user.contacts.push(contactId);

  const validUniqContact = { $addToSet: { contacts: { $each: contacts } } };

  const updateUser = await User.findByIdAndUpdate(user._id, validUniqContact, {
    new: true,
  });

  res.json({ contacts: updateUser.contacts });
};

module.exports = {
  getInfo: ctrlWrapper(getInfo),
  getContacts: ctrlWrapper(getContacts),
  addContact: ctrlWrapper(addContact),
};
