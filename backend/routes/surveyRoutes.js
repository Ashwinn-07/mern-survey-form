import { Router } from "express";
import { createSurvey } from "../controllers/surveyController.js";

const router = Router();

router.post("/", createSurvey);

export default router;
