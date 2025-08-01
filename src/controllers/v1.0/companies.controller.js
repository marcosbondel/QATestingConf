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

const { 
    respondWithError,
    respondWithSuccess,
    respondWithInternalServerError,
    respondWithNotFound,
} = require('../../system')

const findCompanies = async(request, response) => {
    let { version, resource } = request.params
    try {
        let result = await Company.find({})

        if (!result.success) {
            return respondWithError(response, `Failed to find resource: ${result.message}`)
        }

        return respondWithSuccess(response, result.data)

    } catch (error) {
        console.log(error)
        
        logger.error(`Error creating resource: ${error.message}`)
        
        return respondWithInternalServerError(response, 'An error occurred while processing your request', [error.message])
    }
}

const findCompany = async(request, response) => {
    let { id } = request.params
    try {
        let result = await Company.findById(id)

        if (!result) {
            return respondWithNotFound(response, 'Company not found')
        }

        return respondWithSuccess(response, result)
    } catch (error) {
        console.log(error)
        
        logger.error(`Error creating resource: ${error.message}`)
        
        return respondWithInternalServerError(response, 'An error occurred while processing your request', [error.message])
    }
}

const createCompany = async(request, response) => {
    let {
        name,
        address,
        phone,
        website,
        industry,
        businessType
    } = request.params

    try {
        let newCompany = new Company({
            name,
            address,
            phone,
            website,
            industry,
            businessType
        })

        let result = await newCompany.save()

        if (!result) {
            return respondWithError(response, 'Failed to create company')
        }

        return respondWithSuccess(response, result.data)
    } catch (error) {
        console.log(error)
        
        logger.error(`Error creating resource: ${error.message}`)
        
        return respondWithInternalServerError(response, 'An error occurred while processing your request', [error.message])
    }
}

const updateCompany = async(request, response) => {
    let { version, resource, id } = request.params
    let body = request.body
    try {
    } catch (error) {
        console.log(error)
        
        logger.error(`Error updating resource: ${error.message}`)
        
        return respondWithInternalServerError(response, 'An error occurred while processing your request', [error.message])
    }
}

const deleteCompany = async(request, response) => {
    let { version, resource, id } = request.params
    try {

        return respondWithSuccess(response, result.message)
    } catch (error) {
        console.log(error)
        
        logger.error(`Error deleting resource: ${error.message}`)
        
        return respondWithInternalServerError(response, 'An error occurred while processing your request', [error.message])
    }
}

module.exports = {
    findCompanies,
    findCompany,
    createCompany,
    updateCompany,
    deleteCompany
}