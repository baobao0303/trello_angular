import express from "express";
import * as userController from "../controllers/users.controller";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.post("/users", userController.register);
router.post("/users/login", userController.login);
router.get("/user", authMiddleware, userController.currentUser);

module.exports = router;
