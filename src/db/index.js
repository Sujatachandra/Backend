// for connecting the database we need to import the database mongoose 
// and we have to import the databse name as well from the contants.js file 

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


// here we are creating one function and will export it 
// here we will use async wait as the database could be in another continent
const connectDB = async () => {

    // here we will use try catch as we are doing the database connection there could be error 
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        // this process is the referance of the current application which is running currently
        // node is giving the acces of process to us 
        // the currently running application we can exit from it using the process.exit 
        process.exit(1)
    }
}

export default connectDB