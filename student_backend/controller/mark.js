import { Student } from "../models/student.js";
import { Mark } from "../models/marks.js";

export const addMarkForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subject, marks } = req.body;

    // Validation checks
    if (!subject || marks === undefined || marks === null) {
      return res.status(400).json({
        message: "Subject and marks are required",
      });
    }

    if (typeof marks !== "number" || marks < 0 || marks > 100) {
      return res.status(400).json({
        message: "Marks must be a number between 0 and 100",
      });
    }

    // Check if student exists
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Prevent duplicate subject entries
    const existingMark = await Mark.findOne({
      where: { studentId, subject },
    });

    if (existingMark) {
      return res.status(400).json({
        message: "Mark for this subject already exists",
      });
    }

    // Create mark
    const mark = await Mark.create({ subject, marks, studentId });

    return res.status(201).json({
      message: "Mark added successfully",
      data: mark,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while adding mark",
      error: err.message,
    });
  }
};


