import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { secret } from "../config/config";
import { error } from "console";

const normailUser = (user: UserDocument) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secret
  );
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    token: token,
  };
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = new UserModel({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    // console.log("newUser", newUser);
    const saveUser = await newUser.save();
    console.log("saveUser", saveUser);
    res.status(402).json(normailUser(newUser));
  } catch (err) {
    console.log("error", err);
    if (err instanceof Error.ValidationError) {
      const message = Object.values(err.errors).map((error) => error.message);
      res.status(404).json(message);
    }
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).select("+password");

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isValidPassword = await user.validatorPassword(req.body.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    next(error);
  }
};
