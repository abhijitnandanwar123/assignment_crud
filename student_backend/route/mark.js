import express from "express";
import { addMarkForStudent } from "../controller/mark.js";

const router = express.Router();

router.post("/students/:studentId/marks", addMarkForStudent);

export default router;
