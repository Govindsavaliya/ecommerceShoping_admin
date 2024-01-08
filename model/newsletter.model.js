const mongoose = require("mongoose");
const emailValidator = require("validator");

const Schema = mongoose.Schema;

const NewsLatterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!emailValidator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const NewsLetter = mongoose.model("newsLetter", NewsLatterSchema);

module.exports = NewsLetter;
