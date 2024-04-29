import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinar} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async(req,res) => {
    
    // steps for register the user 
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    // step 1
    const {fullname, email ,username, password} = req.body;
    console.log("email", email);

    // step2 
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // step3 
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser)
    {
        throw new ApiError(409, "User with email or username already exists")
    }

    // step4
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Avatar file is required ");
    }

    // step5 
    const avatar = await uploadOnCloudinar(avatarLocalPath);
    const coverImage = await uploadOnCloudinar(coverImageLocalPath);

    if(!avatar)
    {
        throw new ApiError(400, "Avatar file is required ");
    }

    // step6 
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // step7 
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser)
    {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    // step8 
    return res.status(201).json(
        new ApiResponse(200, createUser, "User registered successfully")
    )
} )

export {registerUser}