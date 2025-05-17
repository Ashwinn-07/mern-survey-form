import { Router } from "express";
import { createSurvey } from "../controllers/surveyController";

const router = Router();

router.post("/", createSurvey);

export default router;
