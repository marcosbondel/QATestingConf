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
    app, 
    request, 
    faker, 
    UserMock,
    CompanyMock,
    generateToken,
    commonExpectsForSuccess,
    commonExpectsForError,
    commonExpectsForNotFound,
    commonExpectsForUnauthorized,
} = require('../../../helper')

describe('POST /v1.0.0/companies', () => {

    describe('Successful Company Creation', () => {
        beforeAll(async () => {
            // Create a user to authenticate the request
            this.user = await UserMock.create()
            this.token = generateToken(this.user._id)
        })

        test('it is expected to create a new company successfully', async () => {
            let params = CompanyMock.params()
            // Sending a valid company object
            this.response = await request(app)
                .post('/api/v1.0/companies')
                .set('Authorization', `Bearer ${this.token}`)
                .send(params)
            
            // Common Expects For Success
            commonExpectsForSuccess(this.response)

            // Check the response structure
            expect(this.response.body).toHaveProperty('data')
            expect(this.response.body.data).toHaveProperty('_id')
            expect(this.response.body.data.name).toBe(params.name)
            expect(this.response.body.data).toHaveProperty('address')
            expect(this.response.body.data.address).toBe(params.address)
            expect(this.response.body.data).toHaveProperty('phone')
            expect(this.response.body.data.phone).toBe(params.phone)
            expect(this.response.body.data).toHaveProperty('website')
            expect(this.response.body.data.website).toBe(params.website)
            expect(this.response.body.data).toHaveProperty('industry')
            expect(this.response.body.data.industry).toBe(params.industry)
            expect(this.response.body.data).toHaveProperty('businessType')
            expect(this.response.body.data.businessType).toBe(params.businessType)
            expect(this.response.body.data).toHaveProperty('createdAt')
            expect(this.response.body.data).toHaveProperty('updatedAt')
        })
    })

    describe('Unsuccessful Company Creation', () => {
        beforeAll(async () => {
            // Create a user to authenticate the request
            this.user = await UserMock.create()
            this.token = generateToken(this.user._id)
        })

        test('it is expected to return an error when the user is not authenticated', async () => {
            // Sending a request without authentication (TOKEN)
            this.response = await request(app)
                .post('/api/v1.0/companies')
            
                // Common Expects For Unauthorized
            commonExpectsForUnauthorized(this.response)

            // Check the response structure
            expect(this.response.body).toHaveProperty('message')
        })

        test('it is expected to return an error when the company website is invalid', async () => {
            // Sending a company with an invalid website URL
            this.response = await request(app)
                .post('/api/v1.0/companies')
                .set('Authorization', `Bearer ${this.token}`)
                .send({
                    ...CompanyMock.params(),
                    website: 'invalid-url' // Invalid URL
                })

            // Common Expects For Error
            commonExpectsForError(this.response)
        })

        test('it is expected to return an error when the company name is too short', async () => {
            // Sending a company with a short name
            this.response = await request(app)
                .post('/api/v1.0/companies')
                .set('Authorization', `Bearer ${this.token}`)
                .send({
                    ...CompanyMock.params(),
                    name: faker.string.alpha(1) // Invalid name
                })

            // Common Expects For Error
            commonExpectsForError(this.response)

            expect(this.response.body).toHaveProperty('message')
            expect(this.response.body).toHaveProperty('details')
            expect(this.response.body.details).toBeInstanceOf(Array)
            expect(this.response.body.details.length).toBeGreaterThan(0)
        })

        test('it is expected to return an error when required fields are missing', async () => {
            // Sending an empty object to trigger validation error
            this.response = await request(app)
                .post('/api/v1.0/companies')
                .set('Authorization', `Bearer ${this.token}`)
                .send({}) // Sending empty object to trigger validation error
            
            // Common Expects For Error
            commonExpectsForError(this.response)

            // Check for specific error messages
            expect(this.response.body).toHaveProperty('message')
            expect(this.response.body).toHaveProperty('details')
            expect(this.response.body.details).toBeInstanceOf(Array)
            expect(this.response.body.details.length).toBeGreaterThan(0)
            expect(this.response.body.details[0]).toHaveProperty('type')
            expect(this.response.body.details[0]).toHaveProperty('msg')
            expect(this.response.body.details[0]).toHaveProperty('path')
            expect(this.response.body.details[0]).toHaveProperty('location')
            
            expect(this.response.body.details[0].type).toBe('field')
            expect(this.response.body.details[0].location).toBe('body')
        })
    })

})