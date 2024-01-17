import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected with MongoDB')
    })
    .catch((error) => {
        console.log(error)
    })

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('App is listening to the PORT 3000')
})

app.use('/api/auth', authRouter)