import express from "express";
import * as userController from "../controllers/users.controller";

const router = express.Router();

router.post("/users", userController.register);

module.exports = router;
