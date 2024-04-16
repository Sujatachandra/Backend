class ApiError extends error{
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    )
    {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        // this part can be avoided 
        if(stack){
            this.stack = stack
        }
        else
        {
            Error.captureStackTrace(this, this.constructor)
        }
    }

    

    
}