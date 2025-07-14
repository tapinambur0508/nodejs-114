import express from 'express';

import {
  getStudentsController,
  getStudentController,
  createStudentController,
  deleteStudentController,
  updateStudentController,
  replaceStudentController,
} from '../controllers/student.controller.js';

import { isValidID } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';

import { studentSchema, updateStudentSchema } from '../validation/student.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getStudentsController));

router.get('/:id', isValidID, ctrlWrapper(getStudentController));

router.post(
  '/',
  validateBody(studentSchema),
  ctrlWrapper(createStudentController),
);

router.delete('/:id', isValidID, ctrlWrapper(deleteStudentController));

router.patch(
  '/:id',
  isValidID,
  validateBody(updateStudentSchema),
  ctrlWrapper(updateStudentController),
);

router.put(
  '/:id',
  isValidID,
  validateBody(studentSchema),
  ctrlWrapper(replaceStudentController),
);

export default router;
