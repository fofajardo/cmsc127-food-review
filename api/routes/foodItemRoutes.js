import express from "express";

import * as foodItemController from "../controllers/foodItemController.js";
import * as foodTypeController from "../controllers/foodTypeController.js";
import { RequireAuthenticated } from "../middleware/requireAuthenticated.js";

const router = express.Router();

router.use(RequireAuthenticated);

/*
 * /food-items
 */
router.post("/", foodItemController.createNewFoodItem);

router.get("/", foodItemController.getAllFoodItems);

router.get("/:foodItemId", foodItemController.getOneFoodItem);

router.put("/:foodItemId", foodItemController.updateOneFoodItem);

router.delete("/:foodItemId", foodItemController.deleteOneFoodItem);

/*
 * /food-items/:foodItemId/types
 */
router.post("/:foodItemId/types", foodTypeController.replaceAllFoodTypes);

router.get("/:foodItemId/types", foodTypeController.getAllFoodTypes);

router.delete("/:foodItemId/types/:foodTypeName",
    foodTypeController.deleteOneFoodType);

router.delete("/:foodItemId/types", foodTypeController.deleteAllFoodTypes);

export default router;
