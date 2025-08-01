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

// · Imports
const { Router } = require('express')
const { 
    login,
    register,
    logout
} = require('../../controllers')
const { check } = require('express-validator')
const { validateFields } = require('../../middlewares/validators')
const { validateEmailExistence } = require('../../utils')

const authRoutes = Router()

authRoutes.post('/v1.0/auth/register', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('lastname', 'Lastname is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check("email").custom(validateEmailExistence),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
        validateFields
    ],
    register
)
authRoutes.post('/v1.0/auth/login', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    login
)
authRoutes.post('/v1.0/auth/logout', 
    [
        validateFields
    ],
    logout
)

module.exports = {
    authRoutes
}