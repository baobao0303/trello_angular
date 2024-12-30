import { model, Schema } from "mongoose";
import { UserDocument } from "../types/user.interface";
import bcryptjs from "bcryptjs";
import validator from "validator";

const userShema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
      createIndex: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);

    return next();
  } catch (error) {
    return next(error as Error);
  }
});

userShema.methods["validatorPassword"] = function (password: string) {
  return bcryptjs.compare(password, this["password"]); // Use bracket notation
};

export default model<UserDocument>("User", userShema);
