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
    commonExpectsForSuccess,
    commonExpectsForError,
    commonExpectsForNotFound
} = require('../../../helper')

describe('POST /v1.0.0/auth/login', () => {
    
    let user = null
    let userParams = null

    describe('Successful Login', () => {
        
        
        beforeEach(async () => {
            // Clear the database before each test
            await User.deleteMany({});

            // Prepare a user object for registration
            userParams = {
                name: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 8 })
            }

            // Create a user in the database
            user = new User(userParams)

            // Encrypt the password and save the user
            await user.encryptPassword();

            // Save the user to the database
            await user.save();
        })

        it('is expected to respond with success when valid credentials are provided', async () => {
            // Send a POST request to the login endpoint
            this.response = await request(app).post('/api/v1.0/auth/login').send({
                email: userParams.email,
                password: userParams.password
            })
            
            // Common Expects For Success
            commonExpectsForSuccess(this.response)

            // Check if the response contains the expected user data
            expect(this.response.body.data).toHaveProperty('user')
            expect(this.response.body.data.user).toHaveProperty('id', user._id.toString())
            expect(this.response.body.data.user).toHaveProperty('name', userParams.name)
            expect(this.response.body.data.user).toHaveProperty('lastname', userParams.lastname)
            expect(this.response.body.data.user).toHaveProperty('email', userParams.email)
            expect(this.response.body.data.user).toHaveProperty('role', 'USER') // Default role
            expect(this.response.body.data).toHaveProperty('token')
            expect(this.response.body.data.token).toBeDefined()
            expect(this.response.body.data.token).toBeTruthy()
        })
    })

    describe('Unsuccessful Login', () => {
        it('is expected to respond with error when email is not registered', async () => {
            // Prepare a non-registered email and password
            let email = faker.internet.email()
            let password = faker.internet.password({ length: 8 })
    
            // Send a POST request to the login endpoint
            this.response = await request(app).post('/api/v1.0/auth/login').send({
                email,
                password
            })
    
            // Common Expects For Error
            commonExpectsForNotFound(this.response)

            // Check if the response contains the expected error message
            expect(this.response.body.message).toBe('Resource not found :(')
        })

        it('is expected to respond with error when password is incorrect', async () => {
            // Send a POST request to the login endpoint with incorrect password
            this.response = await request(app).post('/api/v1.0/auth/login').send({
                email: user.email,
                password: 'wrongpassword'
            })
            
            // Common Expects For Error
            commonExpectsForError(this.response)

            // Check if the response contains the expected error message
            expect(this.response.body.message).toBe('Wrong password : (')
        })
    })
})