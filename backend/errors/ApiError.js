class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static serverError(msg){
        return new ApiError(500, msg);
    }
    static conflict(msg){
        return new ApiError(409, msg);
    }
    static unauthorized(msg) {
        return new ApiError(401, msg);
    }
    static forbidden(msg) {
        return new ApiError(403, msg);
    }
    static unprocessable(msg) {
        return new ApiError(422, msg);
    }
    static notfound(msg) {
        return new ApiError(404, msg);
    }
    static duplicateField(msg){
        return new ApiError(400, msg)
    }
    static validationError(msg){
        return new ApiError(400, msg)
    }
}

module.exports = ApiError;