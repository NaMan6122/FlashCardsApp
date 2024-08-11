class ApiError extends Error{
    constructor(
        statusCode,
        message = "Api Error!",
        error = []
    ){
        super(message);//using super to inject "message" in the Error class and can be accessedusing err.message also.
        this.statusCode = statusCode;
        this.error = error;
        this.data = null;
        this.success = success;
    }
}

export {ApiError};