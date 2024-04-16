// this statement means that whenever our applicatio has been started the env variables initialised at first in all the files where the env 
// variables are used 
// but this statement will break the consistency of our code so we will write the same in some another method 
//require('dotenv').config({path: './env'})



import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()

.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at PORT : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("mongo db connection failed !!!",err);
})



// function connectDB(){}

// connectDB

// we will use IIFE (immediedtly invoked function execution ) with async wait because database cnection will take time 

// the semicolon is for the cleaning purpose 
// if someone forgot to give the semicolon in the previous line then it will not through an error

// sometimes we also initialise the app whch is made up of express 


// import express from "express"
// const app = express()
// ;(async () => {

//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         //  after the database connection has been done we can see some listeners , app is having those listeners 
//         // which can listen so many events one of those is error 
//         app.on("error", (error) => {
//             console.log("ERR:", error);
//             throw error
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`app is listening on port ${process.env.PORT}`);
//         })
//     } 
//     catch (error) {
//         console.error("ERROR: ", error)
//         throw err
//     }
// })()

