import { Router } from "express";
import { adminLogin, adminLogout } from "../controllers/adminController";
import { getAllSurveys } from "../controllers/surveyController";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/login", adminLogin);

router.post("/logout", adminLogout);

router.get("/surveys", protect, getAllSurveys);

export default router;
