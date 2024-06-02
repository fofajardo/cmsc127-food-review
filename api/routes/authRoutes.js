import express from "express";

import authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/sign-in", authController.signIn);

router.get("/signed-in-user", authController.signedInUser);

router.post("/sign-up", userController.createNewUser);

router.post("/sign-out", authController.signOut);

router.get("/dump-session", authController.dumpSession);

export default router;