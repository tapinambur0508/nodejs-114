import { getStudents, getStudentById } from '../services/student.service.js';

export async function getStudentsController(req, res) {
  const students = await getStudents();

  res.json({
    status: 200,
    message: 'Successfully get students',
    data: students,
  });
}

export async function getStudentController(req, res) {
  const student = await getStudentById(req.params.id);

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
}
