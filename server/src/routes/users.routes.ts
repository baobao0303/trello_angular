import express from "express";
import * as userController from "../controllers/users.controller";

const router = express.Router();

router.post("/users", userController.register);
router.post("/users/login", userController.login);

module.exports = router;
