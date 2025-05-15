import express from "express";
import {
  createQuestionnaire,
  deleteQuestionnaire,
  getQuestionnaire,
  getQuestionnaires,
  getQuestionnairesStats,
  updateQuestionnaire,
} from "../controllers/questionnaire.js";
const router = express.Router();

router.route("/").get(getQuestionnaires).post(createQuestionnaire);
router.route("/stats").get(getQuestionnairesStats);
router.route("/:id").get(getQuestionnaire).patch(updateQuestionnaire).delete(deleteQuestionnaire);

export default router;
