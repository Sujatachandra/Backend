// asyncHandler using promises 
const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err)) 
    }
}














// asyncHandler using try catch 
// async is a higher order function
// here we are making a wrapper clas sfor further use i the project multiples times 

// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}
// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 400).json({
//             success: false,
//             message: err.message
//         })
//     }
// }