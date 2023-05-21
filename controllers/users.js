const User = require("../models/user");
const { HttpError, ctrlWrapper, sendMail } = require("../helpers");

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

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, "User not found");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(400, "Email not found");
  if (user.verify) throw HttpError(400, "Verification has already been passed");

  await sendMail({
    to: email,
    subject: "Please, confirm your email",
    html: `<a href=http://localhost:3000/api/users/verify/${user.verificationToken}>Confirm your email</a>`,
  });

  res.json({ message: "Verification email sent" });
};

module.exports = {
  getInfo: ctrlWrapper(getInfo),
  getContacts: ctrlWrapper(getContacts),
  addContact: ctrlWrapper(addContact),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
