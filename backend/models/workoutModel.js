import mongoose from "mongoose";

// ! this one is optional
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    RIR: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true }

)


export default mongoose.model('Workout', workoutSchema);