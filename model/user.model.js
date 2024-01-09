const { mongoose, model, Schema } = require("mongoose");
const emailValidator = require("validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      default: "",
    },
    last_name: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate(value) {
        if (!emailValidator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
      unique: true,
    },
    wallet: {
      amount: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "",
      },
    },
    email_token: {
      type: String,
      default: "",
    },
    is_verifyed: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      // trim: true,
      // minlength: [8, "Password must be at least 8 characters"],
      // maxlength: [128, "Password max length exceed"]
    },
    coupon_expire: {
      type: String,
      default: "active",
    },
    discount_status: {
      type: String,
      default: "on",
    },
    ship_address1: {
      type: String,
      default: "",
    },
    ship_address2: {
      type: String,
      default: "",
    },
    ship_zip: {
      type: String,
      default: "",
    },
    ship_city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    ship_country: {
      type: String,
      default: "",
    },
    is_admin: {
      type: Number,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
  }
  next();
});
UserSchema.methods.generateauthtoken = async function () {
  try {
    let token = jwt.sign({ _id: this.id }, process.env.SECRET_KEY);
    this.token = await token;
    await this.save();
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

const User = model("user", UserSchema);

module.exports = User;
