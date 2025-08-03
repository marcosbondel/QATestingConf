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

const { validationResult } = require("express-validator")
const { respondWithError, respondWithUnauthorized, logger } = require('../system')
const jwt = require('jsonwebtoken')

const validateFields = (request, response, next) => {
    let validations = validationResult(request)

    if(!validations.isEmpty())
        return respondWithError(response, "Missing or invalid params", validations.errors)
    

    next()
}

const validateJWT = (request, response, next) => {
    // Token example "AUthorization: Bearer <token>"
    let token = request.headers.authorization
    
    if(!token)
        return respondWithUnauthorized(response)
    
    token = token.split(' ')[1] // Get the token part after "Bearer"
    
    if(!token)
        return respondWithUnauthorized(response)
    

    try {
        const { sub } = jwt.verify(token, process.env.JWT_SECRET)
        request.sub = sub

        next()

    } catch (error) {
        logger.error(`JWT validation error: ${error.message}`)
        return respondWithUnauthorized(response)
    }
}

module.exports = {
    validateFields,
    validateJWT
}