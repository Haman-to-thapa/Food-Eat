import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB';
import userRoutes from './route/userRoutes'
import bodyparse from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// defaultMiddleWare for any mern project

app.use(bodyparse.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true, limit:'10mb`'}));
app.use(express.json())
app.use(cookieParser());
const corsOptions = {
  origin:"http://localhost:5173",
  credentials:true
}
app.use(cors(corsOptions))

//  api rotues here 
app.use('/api/v1/user', userRoutes);


app.get('/', (_req, res) => {
  res.send('Hello from TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
