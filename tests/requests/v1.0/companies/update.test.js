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

describe('PUT /v1.0.0/companies/:id', () => {
    
    describe('Successful Company Update', () => {
        beforeAll(async () => {
            // Create a user to authenticate the request
            this.user = await UserMock.create()
            this.token = generateToken(this.user._id)

            // Create a company to update
            this.company = await CompanyMock.create()
        })

        test('it is expected to update a company successfully', async () => {
            let updateParams = CompanyMock.params()
            // Sending a valid company object
            this.response = await request(app)
                .put(`/api/v1.0/companies/${this.company._id}`)
                .set('Authorization', `Bearer ${this.token}`)
                .send(updateParams)

            // Common Expects For Success
            commonExpectsForSuccess(this.response)

            // Check the response body
            expect(this.response.body).toHaveProperty('data')
            expect(this.response.body.data).toHaveProperty('_id', this.company._id.toString())
            expect(this.response.body.data).toHaveProperty('name', updateParams.name)
            expect(this.response.body.data).toHaveProperty('address', updateParams.address)
            expect(this.response.body.data).toHaveProperty('phone', updateParams.phone)
            expect(this.response.body.data).toHaveProperty('website', updateParams.website)
            expect(this.response.body.data).toHaveProperty('industry', updateParams.industry)
            expect(this.response.body.data).toHaveProperty('businessType', updateParams.businessType)
            expect(this.response.body.data).toHaveProperty('createdAt')
            expect(this.response.body.data).toHaveProperty('updatedAt')
        })

        test('it is expected to update one attribute of a company successfully', async () => {
            let updateParams = { name: faker.company.name() }
            // Sending a valid company object with only one attribute to update
            this.response = await request(app)
                .patch(`/api/v1.0/companies/${this.company._id}`)
                .set('Authorization', `Bearer ${this.token}`)
                .send(updateParams)

            // Common Expects For Success
            commonExpectsForSuccess(this.response)

            // Check the response body
            expect(this.response.body).toHaveProperty('data')
            expect(this.response.body.data).toHaveProperty('_id', this.company._id.toString())
            expect(this.response.body.data).toHaveProperty('name', updateParams.name)
        })
    })

    describe('Unsuccessful Company Update', () => {
        beforeAll(async () => {
            // Create a user to authenticate the request
            this.user = await UserMock.create()
            this.token = generateToken(this.user._id)

            // Create a company to test
            this.company = await CompanyMock.create()
        })

        test('it is expected to fail when trying to update a company without authentication', async () => {
            let updateParams = CompanyMock.params()
            // Sending a valid company object without authentication
            this.response = await request(app)
                .put(`/api/v1.0/companies/${this.company._id}`)
                .send(updateParams)

            // Common Expects For Unauthorized
            commonExpectsForUnauthorized(this.response)
        })

        test('it is expected to fail when trying to update a non-existing company', async () => {
            let updateParams = CompanyMock.params()
            // Sending a valid company object with an invalid ID
            this.response = await request(app)
                .put(`/api/v1.0/companies/${faker.database.mongodbObjectId()}`)
                .set('Authorization', `Bearer ${this.token}`)
                .send(updateParams)

            // Common Expects For Not Found
            commonExpectsForNotFound(this.response)
        })
    })
    
})