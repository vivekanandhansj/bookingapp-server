import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app=express();
dotenv.config();

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
    } catch(error){
        throw error;
    }
}

app.use(cors({
    origin:"*"
}))

app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) =>
  res.send(`Server Running`)
);
app.use("/api/auth",authRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/users",usersRoute);
app.use("/api/rooms",roomsRoute);


app.listen(process.env.PORT||8800,()=>{
    connect()
    console.log("Connected to backend")
})

