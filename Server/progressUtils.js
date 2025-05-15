// progressUtils.js
import fs from "fs";
import path from "path";

const PROGRESS_FILE = path.join(process.cwd(), "progress.json");

const defaultProgress = {
  leadershipIndex: 0,
  leadershipCount: 0,
  graphicIndex: 0,
  graphicCount: 0,
  webIndex: 0,
  webCount: 0,
  maxStudentsPerCohort: 450, // Updated max limit
};

export function loadProgress() {
  try {
    if (!fs.existsSync(PROGRESS_FILE)) {
      return { ...defaultProgress };
    }
    const data = fs.readFileSync(PROGRESS_FILE, "utf8");
    const parsed = JSON.parse(data);
    return { ...defaultProgress, ...parsed };
  } catch (error) {
    console.warn("Could not load progress.json. Using defaults.");
    return { ...defaultProgress };
  }
}

export function saveProgress(progress) {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), "utf8");
    console.log("Progress saved to progress.json");
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}
