import express from "express";

import * as foodItemController from "../controllers/foodItemController.js";
import { RequireAuthenticated } from "../middleware/requireAuthenticated.js";

const router = express.Router();

router.use(RequireAuthenticated);

/*
 * /users
 */
router.post("/", foodItemController.createNewFoodItem);

router.get("/", foodItemController.getAllFoodItems);

router.get("/:foodItemId", foodItemController.getOneFoodItem);

router.put("/:foodItemId", foodItemController.updateOneFoodItem);

router.delete("/:foodItemId", foodItemController.deleteOneFoodItem);

export default router;