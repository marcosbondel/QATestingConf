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
    Company,
    UserMock,
    CompanyMock,
    generateToken,
    commonExpectsForSuccess,
    commonExpectsForNotFound,
    commonExpectsForUnauthorized,
} = require('../../../helper')

describe('GET /api/v1.0/companies/:id', () => {
    describe('Successful retrive', () => {
        beforeAll(async () => {
            // Create a user to authenticate the request
            this.user = await UserMock.create()
            this.token = generateToken(this.user._id)

            // Create a company to test
            this.company = await CompanyMock.create()
        })

        test('it is expected to retrieve a company successfully', async () => {
            // Sending a valid company ID
            this.response = await request(app)
                .get(`/api/v1.0/companies/${this.company._id}`)
                .set('Authorization', `Bearer ${this.token}`)
            
            // Common Expects For Success
            commonExpectsForSuccess(this.response)

            // Check the response body
            expect(this.response.body).toHaveProperty('data')
            expect(this.response.body.data).toHaveProperty('_id', this.company._id.toString())
            expect(this.response.body.data).toHaveProperty('name', this.company.name)
            expect(this.response.body.data).toHaveProperty('address', this.company.address)
            expect(this.response.body.data).toHaveProperty('phone', this.company.phone)
            expect(this.response.body.data).toHaveProperty('website', this.company.website)
            expect(this.response.body.data).toHaveProperty('industry', this.company.industry)
            expect(this.response.body.data).toHaveProperty('businessType', this.company.businessType)
        })
    })

    describe('Unsuccessful retrive', () => {
        beforeAll(async () => {
            // Create a user to authenticate the request
            this.user = await UserMock.create()
            this.token = generateToken(this.user._id)

            // Create a company to test
            this.company = await CompanyMock.create()
        })
        
        test('it is expected to return 401 when no token is provided', async () => {
            // Sending a valid company ID without token
            this.response = await request(app)
                .get(`/api/v1.0/companies/${this.company._id}`)
            
            // Common Expects For Unauthorized
            commonExpectsForUnauthorized(this.response)
        })

        test('it is expected to return 404 when company does not exist', async () => {
            // Sending a non-existing company ID
            this.response = await request(app)
                .get(`/api/v1.0/companies/${faker.database.mongodbObjectId()}`) // Invalid ObjectId
                .set('Authorization', `Bearer ${this.token}`)
            
            // Common Expects For Not Found
            commonExpectsForNotFound(this.response)

            // Check response structure
            expect(this.response.body).toHaveProperty('message')
            expect(this.response.body.message).toBe('Company not found')
        })
    })
})