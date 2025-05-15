import XLSX from "xlsx";
import fs from "fs";

// 1) Read the Excel file
const workbook = XLSX.readFile("./public/new_assigned_students.xlsx"); // Adjust path if needed

// 2) Select the first sheet (or the one that contains your data)
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 3) Convert the sheet to JSON
//    This yields an array of objects based on your column headers
const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

// 4) Map each row to the desired JavaScript object
//    *Important*: Make sure these keys ("Student ID", "First Name", etc.)
//    match exactly the column headers in your spreadsheet.
const students = data.map((row) => ({
  matricNo: row["Student ID"],
  firstname: row["First Name"],
  lastname: row["Last Name"],
  email: row["Email"],
  phone: row["Phone"],
  gender: row["Gender"],
  level: row["Level"],
  department: row["Department"],
  course_1: row["Skil 1"],
  course_2: row["Skill 2"],
}));

const output = `const new_students = ${JSON.stringify(students, null, 2)};\n\nexport default new_students;`;
fs.writeFileSync("./public/new_students.js", output);

console.log("new_students.js has been generated!");

// Option B: Or just console.log the array directly
// console.log(JSON.stringify(students, null, 2));
