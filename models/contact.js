const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      match: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      match: /^\(\d{3}\) \d{3}-\d{4}$/,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
