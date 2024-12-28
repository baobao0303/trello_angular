import { UserDocument } from "./user.interface";
import { Request } from "express";

export interface ExpressRequestInterface extends Request {
  user?: UserDocument;
}
