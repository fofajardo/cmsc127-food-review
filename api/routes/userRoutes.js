import express from "express";

import *  as userController from "../controllers/userController.js";
import { RequireAuthenticated } from "../middleware/requireAuthenticated.js";

const router = express.Router();

router.use(RequireAuthenticated);

/*
 * /users
 */
router.post("/", userController.createNewUser);

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getOneUser);

router.put("/:userId", userController.updateOneUser);

router.delete("/:userId", userController.deleteOneUser);

export default router;