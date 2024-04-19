// with in this file we have our apps 
// and for apps we need to import express 

import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express();

// use merthods are used for middlewares and configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// limit of taking the json files 
app.use(express.json({limit: "16kb"}))

// url data accepting 
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// accepting files and images datas 
app.use(express.static("public"))

app.use(cookieParser());


// import routes 
import userRouter from './routes/user.routes.js'

// routes declearation 
app.use("/api/v1/users",userRouter)

// url building 
//http://localhost:8000/api/v1/users/register
export{app}

