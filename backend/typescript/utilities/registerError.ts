class ErrorHandler extends Error {
    statusCode:number;
    
    constructor(message:string, statusCode:number){
        super(message);
        this.statusCode = statusCode
        this.message = message

        console.log(this.message, this.statusCode)
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;