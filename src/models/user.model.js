import mongoose ,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
 

const userSchema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

            // when we frequently search any fields we will mark the index as true of that field, so that it will be easy to search
            index: true,
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname:
        {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar:
        {
            type: String, // cloudinary url
            required: true,
        },
        coverImage:
        {
            type: String, // cloudinary url
        },
        watchHistory:
        [
            {
                type: Schema.Types,ObjectId,
                ref: "Video",
            }
        ],
        password:
        {
            type: String,
            required: [true, 'Password is required']
        },
        refreshTokens:
        {
            type: String,
        }

    },
    {
        tumeStamps: true,
    }
)

// password encription 
useSchema.pre("save",async function (next){
    
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

// chcek if the pasword is correct or not 
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

// generating access and refeesh  tokens using functions 
userSchema.methods.generateAccessTokens = function (){
    // there is a method in jwt "sign" which will make our tokens 
    return jwt.sign(
        {
            // payloads 
            _id: this.id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
            
        },
        process.env,ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    
}
userSchema.methods.generateRefreshTokens = function (){

    return jwt.sign(
        {
            // payloads 
            _id: this.id,
            
        },
        process.env,REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User", userSchema)

// bcrypt
//A library to help you hash passwords.

//jsonwebtokens 
//They are commonly used for authentication and authorization in web applications and APIs.


//Pre middleware functions are executed one after another, when each middleware calls next.

// jwt is a type of bearer token 
// means who have this token we will send them the data from the database 
// jwt token will make the tokens 
