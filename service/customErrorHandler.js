class CustomErrorHandler {
    constructor(status,message) {
        this.status = status;
        this.message = message;
    }
    static wrongCredentials(message="Bad Request") {
        return new CustomErrorHandler(400,message)
    }
    static misinginput(message="Unauthorized") {
        return new CustomErrorHandler(401,message)
    }
    static catcherror(message="Not Found") {
        return new CustomErrorHandler(404,message)
    }
    // static Somthing(message="Somthig went to wrong") {
    //     return new CustomErrorHandler(401,message)
    // }
}

module.exports = CustomErrorHandler;