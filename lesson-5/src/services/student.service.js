import { Student } from '../models/students.js';

export function getStudents() {
  return Student.find();
}

export function getStudentById(studentId) {
  return Student.findById(studentId);
}
