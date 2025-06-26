import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from "./config/db.js";
import student from "./route/student.js";
import mark from "./route/mark.js";
import { errorHandler } from './middlewares/errorHandler.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
connectToDB();

app.get('/', (req, res) => {
  res.send(`Welcome to ${process.env.APP_NAME}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.use("/students", student);
app.use(mark);
app.use(errorHandler);
