import express from "express";
import * as foodEstabController from "../controllers/foodEstabController.js";
import { RequireAuthenticated } from "../middleware/requireAuthenticated.js";

const router = express.Router();

router.use(RequireAuthenticated);

router.post("/", foodEstabController.createNewEstablishment);
router.get("/", foodEstabController.getAllEstablishments);
router.get("/:establishmentId", foodEstabController.getOneEstablishment);
router.put("/:establishmentId", foodEstabController.updateOneEstablishment);
router.delete("/:establishmentId", foodEstabController.deleteOneEstablishment);

export default router;