'use strict'
/*
MIT License

Copyright (c) 2025 Marcos Bonifasi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

· ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~     ~·~
·
*/

const { logger } = require("./logger")


const respondWithSuccess = (res, payload) => {
    
    logger.log('info', `Response sent successfully: ${JSON.stringify(payload)}`)
    
    res.status(200).json({ data: payload })
}

const respondWithPagination = (res, payload) => {
    res.status(200).json(payload)
}

const respondWithError = (res, message = "Something went wrong :(", details = [], status = 400) => {

    logger.log('error', `Error response: ${message}, Details: ${JSON.stringify(details)}`)
    
    res.status(status).json({ message, details })
}

const respondWithNotFound = (res, message = "Resource not found :(") => {

    logger.log('warn', `Resource not found: ${message}`)
    
    res.status(404).json({ message })
}

const respondWithUnauthorized = (res, message = "Unauthorized! -_-") => {

    logger.log('warn', `Unauthorized access: ${message}`)
    
    res.status(401).json({ message })
}

const respondWithInternalServerError = (res, message = "Internal Server Error", details = []) => {

    logger.log('error', `Internal Server Error: ${message}, Details: ${JSON.stringify(details)}`)
    
    res.status(500).json({ message, details })
}

module.exports = {
    respondWithSuccess,
    respondWithPagination,
    respondWithError,
    respondWithNotFound,
    respondWithUnauthorized,
    respondWithInternalServerError
}