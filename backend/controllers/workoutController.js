import Workout from '../models/workoutModel.js'
import mongoose from 'mongoose';

// ! get all workouts
export const getWorkouts = async (req, res) => {
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
}

// ! get a single workout
export const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
}

// ! create new workout
export const createWorkout = async (req, res) => {
    const { title, load, sets, reps, RIR, note } = req.body;

    let emptyFields = [];
    if (!title) {
        emptyFields.push('title');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (!sets) {
        emptyFields.push('sets');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (!RIR) {
        emptyFields.push('RIR');
    }
    if (!note) {
        emptyFields.push('note');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
    }

    // add doc to db
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({ title, load, sets, reps, RIR, note, user_id });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

// ! delete a workout
export const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    // ! difference between findByIdAndDelete and findOneAndDelete first one deletes whole object findOneAndDelete can delete whole object or a value inside of an object. For example i want to delete reps: parameter only then i must use findOneAndDelete
    const deleteWorkout = await Workout.findOneAndDelete({ _id: id });
    if (!deleteWorkout) {
        return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json(deleteWorkout);
}

// ! update a workout

export const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    const updateWorkout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!updateWorkout) {
        return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json(updateWorkout);
}

