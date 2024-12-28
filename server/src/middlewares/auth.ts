import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { ExpressRequestInterface } from "../types/expressRequest.interface";
import userModel from "../models/user.model";
import { secret } from "../config/config";

export default async (req: ExpressRequestInterface, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.sendStatus(401);
      return;
    }
    const token = authHeader.split(" ")[1];
    const data = jwt.verify(token, secret) as { id: string; email: string };
    const user = await userModel.findById(data.id);

    if (!user) {
      res.sendStatus(401);
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
