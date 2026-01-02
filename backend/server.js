import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/monogdb.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors()); 
app.use(express.json({ limit: '20mb' }));


connectDB(); 


app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);


app.get('/', (req, res) => {
    res.send("API IS WORKING!!! AURA BACKEND LIVE");
});


export default app;


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server Is Running on port ${PORT}`);
    });
}