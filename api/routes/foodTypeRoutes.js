import express from "express";

import * as foodTypeController from "../controllers/foodTypeController.js";
import { RequireAuthenticated } from "../middleware/requireAuthenticated.js";

const router = express.Router();

router.use(RequireAuthenticated);

/*
 * /food-types
 */
router.get("/", foodTypeController.getAllFoodTypes);

export default router;
