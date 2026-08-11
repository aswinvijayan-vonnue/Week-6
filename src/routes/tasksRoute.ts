import express from 'express';
import {
  getAllTasks,
  getSpecificTask,
  postTask,
  patchData,
  removeTask,
} from '../services/controllers.js';
const router = express.Router();

router.get('/', getAllTasks);
router.get('/:taskId', getSpecificTask);

router.post('/', postTask);

router.patch('/:id', patchData);

router.delete('/:id', removeTask);

export default router;
