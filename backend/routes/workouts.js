import express from 'express'
import { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';
import requireAuth from '../middleware/requireAuth.js'


const router = express.Router();

// ! require auth for all workout routes
router.use(requireAuth);

// ! GET ALL workouts
router.get('/', getWorkouts);

// ! GET A SINGLE workout
router.get('/:id', getWorkout);

// ! POST A NEW workout
router.post('/', createWorkout);
// ! DELETE A workout
router.delete('/:id', deleteWorkout);

// ! UPDATE A workout
router.patch('/:id', updateWorkout);
export default router;