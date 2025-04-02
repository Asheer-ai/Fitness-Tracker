import express from "express";
import * as dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoute.js"

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}))


app.use("/api/user/", UserRoutes);
// error handler

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.get("/",async(req,res)=>{
    res.status(200).json({
        message:"Hello fam bruh"
    });
});

const connectDb= () => {
    mongoose.set("strictQuery",true);
    mongoose
        .connect(process.env.MONGODB_URL)
        .then((res)=>console.log("connected to Mongodb"))
        .catch((err)=>{
            console.log(err);
        })
}

const startserver=async ()=>{
    try {
        connectDb()
        app.listen(8080,()=>console.log("Server runnning at port 8080"))
    } catch (error) {
        console.log(error)
    }
}

startserver();