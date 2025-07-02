import express from 'express';

import { Student } from './models/students.js';

const app = express();

app.get('/students', async (req, res) => {
  const students = await Student.find();

  res.json({
    status: 200,
    message: 'Successfully get students',
    data: students,
  });
});

app.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student === null) {
    return res
      .status(404)
      .json({ status: 404, message: 'Student not found', data: null });
  }

  res.json({
    status: 200,
    message: 'Successfully get student',
    data: student,
  });
});

app.use((req, res, next) => {
  res.status(404).json({ status: 404, message: 'Not found' });
});

export default app;
