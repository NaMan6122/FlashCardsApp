class ApiResponse{
    constructor(
        status,
        data,
        message="Api Res Message",
    ){
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

export {ApiResponse};