import XLSX from "xlsx";
import fs from "fs";
import new_students from "./public/new_students.js";
import old_students from "./public/old_students.js";

// Group students by their courses (checks course_1 and course_2).
function groupStudentsByCourse(students) {
  const groups = {};

  students.forEach((student) => {
    // Group by course_1.
    if (student.course_1 && student.course_1.trim()) {
      const course = student.course_1.trim();
      if (!groups[course]) {
        groups[course] = [];
      }
      groups[course].push(student);
    }
    // Group by course_2.
    if (student.course_2 && student.course_2.trim()) {
      const course = student.course_2.trim();
      if (!groups[course]) {
        groups[course] = [];
      }
      // Avoid duplicate if course_2 equals course_1.
      if (!(student.course_1 && student.course_1.trim() === course)) {
        groups[course].push(student);
      }
    }
  });

  return groups;
}

// Utility function to split an array into chunks of a given size.
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// Combine old_students and new_students with old_students first.
// Skip duplicates by checking the matricNo.
const combinedStudents = [];
const addedMatricNos = new Set();

old_students.forEach((student) => {
  if (!addedMatricNos.has(student.matricNo)) {
    combinedStudents.push(student);
    addedMatricNos.add(student.matricNo);
  }
});

new_students.forEach((student) => {
  if (!addedMatricNos.has(student.matricNo)) {
    combinedStudents.push(student);
    addedMatricNos.add(student.matricNo);
  }
});

// Group the combined students by course.
const groupedStudents = groupStudentsByCourse(combinedStudents);

// Define the courses to export.
const coursesToExport = ["Leadership", "Graphic Design", "Web Development"];

// Process each course for export and generate separate CSV files.
coursesToExport.forEach((course) => {
  if (groupedStudents[course]) {
    const courseGroup = groupedStudents[course];

    // Split the course group into chunks of 400 students each.
    const chunks = chunkArray(courseGroup, 399);
    chunks.forEach((chunk, idx) => {
      // Generate a suffix (A, B, C, etc.) based on the chunk index.
      const suffix = String.fromCharCode(65 + idx);
      let fileName = `${course} ${suffix}`;
      // Sanitize the file name by removing problematic characters.
      fileName = fileName.substring(0, 31).replace(/[/\\?*[\]]/g, "_");

      // Create a worksheet from the current chunk.
      const worksheet = XLSX.utils.json_to_sheet(chunk);
      // Convert the worksheet to CSV.
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      // Write the CSV file.
      fs.writeFileSync(`./public/${fileName}.csv`, csv);
      console.log(`CSV file generated: ${fileName}.csv`);
    });
  } else {
    console.log(`No students found for ${course}`);
  }
});

console.log("CSV files for each course chunk have been generated!");
