import { Document } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  password: string;
  createAt: Date;
}

export interface UserDocument extends IUser, Document {
  validatorPassword(param1: string): Promise<boolean>;
}
