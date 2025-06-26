import { Student } from "../models/student.js";
import { Mark } from "../models/marks.js";
export const createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const student = await Student.create({ name, email, age });

    res.status(201).json({
      message: "Student created successfully",
      data: student,
    });

  } catch (err) {
    res.status(400).json({
      message: "Failed to create student",
      error: err.message,
    });
  }
};



export const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;     
    const limit = parseInt(req.query.limit) || 10;  
    const offset = (page - 1) * limit;

    const totalCount = await Student.count();

    const students = await Student.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]  
    });

    res.json({
      data: students,
      pagination: {
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        perPage: limit
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: Mark,
          attributes: ["id", "subject", "marks"],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "Student fetched successfully",
      data: student,
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch student",
      error: err.message,
    });
  }
};



export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
        data: null,
      });
    }

    await student.update(req.body);

    res.status(200).json({
      message: "Student updated successfully",
      data: student,
    });

  } catch (err) {
    res.status(400).json({
      message: "Failed to update student",
      error: err.message,
    });
  }
};


export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    await student.destroy();
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
