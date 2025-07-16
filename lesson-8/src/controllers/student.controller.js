import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
  replaceStudent,
} from '../services/student.service.js';

export async function getStudentsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getStudents(page, perPage, sortBy, sortOrder, filter);

  res.json({
    status: 200,
    message: 'Successfully get students',
    data: students,
  });
}

export async function getStudentController(req, res) {
  const student = await getStudentById(req.params.id);

  if (student === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.json({
    status: 200,
    message: 'Successfully get student',
    data: student,
  });
}

export async function createStudentController(req, res) {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: 'Student created successfully',
    data: student,
  });
}

export async function deleteStudentController(req, res) {
  const result = await deleteStudent(req.params.id);

  if (result === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  // res.status(204).end();
  res.json({ status: 200, message: 'Student deleted successfully' });
}

export async function updateStudentController(req, res) {
  const result = await updateStudent(req.params.id, req.body);

  if (result === null) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.json({
    status: 200,
    message: 'Student updated successfully',
    data: result,
  });
}

export async function replaceStudentController(req, res) {
  const { value, updatedExisting } = await replaceStudent(
    req.params.id,
    req.body,
  );

  if (updatedExisting === true) {
    return res.json({
      status: 200,
      message: 'Student replaced successfully',
      data: value,
    });
  }

  res.status(201).json({
    status: 201,
    message: 'Student created successfully',
    data: value,
  });
}
