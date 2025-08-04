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
    findCompanies,
    findCompany,
    createCompany,
    updateCompany,
    deleteCompany
} = require('../../controllers')
const { check } = require('express-validator')
const { validateFields, validateJWT } = require('../../middlewares')

const companyRoutes = Router()

// · Info endpoint
companyRoutes.get('/v1.0/companies', 
    [
        validateJWT,
        validateFields,
    ],
    findCompanies
)
companyRoutes.get('/v1.0/companies/:id', 
    [
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
        validateJWT,
        validateFields
    ],
    findCompany
)
companyRoutes.post('/v1.0/companies', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('address', 'Address is required').not().isEmpty(),
        check('phone', '').not().isEmpty(),
        check('website', 'Website is required').not().isEmpty(),
        check('industry', 'Industry is required').not().isEmpty(),
        check('businessType', 'Business Type is required').not().isEmpty(),
        validateJWT,
        validateFields
    ],
    createCompany
)
companyRoutes.put('/v1.0/companies/:id', 
    [
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
        validateJWT,
        validateFields
    ],
    updateCompany
)
companyRoutes.patch('/v1.0/companies/:id', 
    [
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
        validateJWT,
        validateFields
    ],
    updateCompany
)
companyRoutes.delete('/v1.0/companies/:id', 
    [
        check('id', 'id is required').not().isEmpty(),
        check('id', 'id must be a valid ObjectId').isMongoId(),
        validateJWT,
        validateFields
    ],
    deleteCompany
)

module.exports = {
    companyRoutes
}