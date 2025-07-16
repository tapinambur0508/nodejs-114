import { Student } from '../models/students.js';

export async function getStudents(page, perPage, sortBy, sortOrder, filter) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const studentQuery = Student.find();

  if (typeof filter.minYear !== 'undefined') {
    studentQuery.where('year').gte(filter.minYear);
  }

  if (typeof filter.maxYear !== 'undefined') {
    studentQuery.where('year').lte(filter.maxYear);
  }

  const [total, students] = await Promise.all([
    Student.find().merge(studentQuery).countDocuments(),
    studentQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    students,
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
}

export function getStudentById(studentId) {
  return Student.findById(studentId); // Student.findOne({ _id: studentId });
}

export function createStudent(payload) {
  return Student.create(payload);
}

export function deleteStudent(studentId) {
  return Student.findByIdAndDelete(studentId);
}

export function updateStudent(studentId, payload) {
  return Student.findByIdAndUpdate(studentId, payload, { new: true });
}

export async function replaceStudent(studentId, payload) {
  const result = await Student.findByIdAndUpdate(studentId, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}
