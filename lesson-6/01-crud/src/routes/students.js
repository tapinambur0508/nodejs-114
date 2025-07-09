import express from 'express';

import {
  getStudentsController,
  getStudentController,
  createStudentController,
  deleteStudentController,
  updateStudentController,
  replaceStudentController,
} from '../controllers/student.controller.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:id', ctrlWrapper(getStudentController));

router.post('/', ctrlWrapper(createStudentController));

router.delete('/:id', ctrlWrapper(deleteStudentController));

router.patch('/:id', ctrlWrapper(updateStudentController));

router.put('/:id', ctrlWrapper(replaceStudentController));

export default router;
