import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { secret } from "../config/config";

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
