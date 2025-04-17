import { Router } from "express";
import { adminLogin } from "../controllers/adminController.js";
import { getAllSurveys } from "../controllers/surveyController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/login", adminLogin);

router.get("/surveys", protect, getAllSurveys);

export default router;
