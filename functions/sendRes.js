exports.sendResponse = (res, statusCode, data) => {
    return res.status(statusCode).json(data)
}

exports.sendResponseApi = (res, statusCode, success, data) => {
    return res.status(statusCode).json(data, success)
}

