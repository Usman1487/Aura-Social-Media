import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/monogdb.js';
import userRouter from './routes/userRoute.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
await connectDB();

app.use('/api/user', userRouter);
app.get('/', (req,res) =>{
    res.send("API IS WORKING!!!")
});

app.listen(PORT, ()=>{
    console.log("Server Is Running")
})



