import Questionnaire from "../models/Questionnaire.js";

// GET with filters
export const getQuestionnaires = async (_req, res) => {
  try {
    const questionnaires = await Questionnaire.find();
    res.status(200).json(questionnaires || []);
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getQuestionnairesStats = async (_req, res) => {
  try {
    const allQuestionnaires = await Questionnaire.find();

    const flatten = (doc) => {
      const flat = {};
      Object.entries(doc).forEach(([step, fields]) => {
        Object.entries(fields || {}).forEach(([key, val]) => {
          flat[`${step}.${key}`] = val;
        });
      });
      return flat;
    };

    const responseStats = allQuestionnaires.map((q) => {
      const flat = flatten(q.toObject());
      const totalQuestions = Object.keys(flat).length;
      const unansweredFields = Object.entries(flat)
        .filter(([_, val]) => !val || (Array.isArray(val) && val.length === 0))
        .map(([key]) => key);
      const answered = totalQuestions - unansweredFields.length;

      return {
        _id: q._id,
        totalQuestions,
        answered,
        unanswered: unansweredFields.length,
        unansweredFields,
      };
    });

    res.status(200).json(responseStats);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate per-response stats", details: err });
  }
};

export const getQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);
    res.status(200).json(questionnaire);
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

// POST
export const createQuestionnaire = async (_req, res) => {
  try {
    const newEntry = new Questionnaire();
    const saved = await newEntry.save();
    res.status(201).json(saved?._id);
  } catch (err) {
    res.status(400).json({ message: "Internal Server error" });
  }
};

// PUT (Update by ID)
export const updateQuestionnaire = async (req, res) => {
  try {
    await Questionnaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Response as been Saved" });
  } catch (err) {
    res.status(400).json({ message: "Internal Server error" });
  }
};

// DELETE
export const deleteQuestionnaire = async (req, res) => {
  try {
    await Questionnaire.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};
