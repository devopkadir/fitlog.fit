import express from 'express';
import dotenv from 'dotenv'
import workoutRoutes from './routes/workouts.js'
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from './routes/user.js';

// ! express app
const app = express();

// ! dotenv
dotenv.config();
const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;

// ! middleware
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// ! routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
// app.get('/', (req, res) => {
//     res.json({ message: "Welcome to the mern-stack-app" })
// })

// ! connect to DB
mongoose.connect(MONGODB)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.error(error);
    })




