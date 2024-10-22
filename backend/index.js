import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import router from "./routes/ruleRoute.js";
import cors from "cors"
const port=process.env.PORT
const app=express();
const uri=process.env.uri
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
        origin:"https://ruleengine-1.onrender.com"
}))
mongoose.connect(uri)
        .then(()=>app.listen(port,()=>console.log(`server running on port ${port}`)))
        .catch((err)=>console.log(err))
app.use("/api",router)