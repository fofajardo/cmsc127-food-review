import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import { RequireAuthenticated } from "../middleware/requireAuthenticated.js";

const router = express.Router();

router.use(RequireAuthenticated);

router.post("/", reviewController.createNewReview);
router.get("/", reviewController.getAllReviews);
router.get("/:reviewId", reviewController.getOneReview);
router.put("/:reviewId", reviewController.updateOneReview);
router.delete("/:reviewId", reviewController.deleteOneReview);

export default router;