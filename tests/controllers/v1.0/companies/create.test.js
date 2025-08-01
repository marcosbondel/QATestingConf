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
    User,
    Company,
    commonExpectsForSuccess,
    commonExpectsForError,
    commonExpectsForNotFound
} = require('../../../helper')

describe('POST /v1.0.0/companies', () => {
    describe('Successful Company Creation', () => {
        let company = null
        let companyParams = null

        beforeEach(async () => {
            // Clear the database before each test
            await User.deleteMany({});

            // Prepare a company object for creation
            companyParams = {
                name: faker.company.name(),
                address: faker.location.streetAddress(),
                phone: faker.phone.number(),
                email: faker.internet.email()
            }

            // Create a company in the database
            company = new Company(companyParams)
            await company.save()
        })

        it('should create a new company successfully', async () => {
            this.response = await request(app)
                .post('/v1.0.0/companies')
                .send(companyParams)

            // Common Expects For Success
            commonExpectsForSuccess(this.response)

            expect(this.response.body.data).toHaveProperty('_id')
            expect(this.response.body.data.name).toBe(companyParams.name)
        })
    })
})