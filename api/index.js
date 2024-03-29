import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.router.js';

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

app.use(cookieParser());

app.listen(3000, () => {
    console.log('App is listening to the PORT 3000')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/listing', listingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})