'use strict'
const { error } = require('winston')
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
    commonExpectsForError
} = require('../../../helper')

describe('POST /v1.0.0/auth/register', () => {
    
    describe('Successful Registration', () => {
        test('is expected to respond with success when valid data is provided', async () => {
            // Prepare a user object for registration
            let user = {
                name: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 8 })
            }
    
            // Send a POST request to the register endpoint
            this.response = await request(app).post('/api/v1.0/auth/register').send(user)
    
            // Common Expects For Success
            commonExpectsForSuccess(this.response)

            // Check if the response contains the expected user data
            expect(this.response.body.data).toHaveProperty('name', user.name)
            expect(this.response.body.data).toHaveProperty('lastname', user.lastname)
            expect(this.response.body.data).toHaveProperty('email', user.email)
            expect(this.response.body.data).toHaveProperty('role', 'USER') // Default role
            expect(this.response.body.data).toHaveProperty('createdAt')
            expect(this.response.body.data).toHaveProperty('updatedAt')
            expect(this.response.body.data).toHaveProperty('_id')
        })
    })

    describe('Error Cases', () => {
        let errorMessages = [
            {
                msg: 'Name is required',
                path: 'name',
            },
            {
                msg: 'Lastname is required',
                path: 'lastname',
            },
            {
                msg: 'Email is required',
                path: 'email',
            },
            {
                msg: 'Password is required',
                path: 'password',
            },
            {
                msg: 'Password must be at least 8 characters long',
                path: 'password',
            }
        ]

        test('is expected to respond with error when no data is provided', async () => {
            // Send a POST request to the register endpoint without any data
            this.response = await request(app).post('/api/v1.0/auth/register').send({})
            
            // Common Expects For Error
            commonExpectsForError(this.response)

            // Check if the response contains the expected error message
            expect(this.response.body.message).toBe('Missing or invalid params')
            
            // Check if the response contains the expected error details
            expect(this.response.body.details).toBeDefined()
            expect(this.response.body.details.length).toBeLessThanOrEqual(errorMessages.length)  
            this.response.body.details.forEach(detail => {
                expect(detail).toHaveProperty('type')
                expect(detail).toHaveProperty('msg')
                expect(detail).toHaveProperty('path')
                expect(detail).toHaveProperty('location')
                
                expect(errorMessages).toEqual(expect.arrayContaining([{
                    msg: detail.msg,
                    path: detail.path,
                }]))
            })
        })
    
        test('is expected to respond with error when invalid data is provided', async () => {
            // Prepare an invalid user object (missing required fields)
            let user = {
                name: faker.person.firstName(),
                lastname: faker.person.lastName()
                // Missing email and password
            }
    
            // Send a POST request to the register endpoint
            this.response = await request(app).post('/api/v1.0/auth/register').send(user)
    
            // Common Expects For Error
            commonExpectsForError(this.response)
        })
    
        test('is expected to respond with error when email is already registered', async () => {
            // Prepare a user object for registration
            let user = {
                name: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 8 })
            }
    
            // First registration should succeed
            await request(app).post('/api/v1.0/auth/register').send(user)
    
            // Second registration with the same email should fail
            this.response = await request(app).post('/api/v1.0/auth/register').send(user)
            // Common Expects For Error
            commonExpectsForError(this.response)
            
            // Check if the response contains the expected error message
            expect(this.response.body.message).toBe('Missing or invalid params')
            expect(this.response.body.details).toBeDefined()
            expect(this.response.body.details.length).toBe(1)
            expect(this.response.body.details[0]).toHaveProperty('type', 'field')
            expect(this.response.body.details[0]).toHaveProperty('value', user.email)
            expect(this.response.body.details[0]).toHaveProperty('msg', `Email "${user.email}" already exists`)
            expect(this.response.body.details[0]).toHaveProperty('path', 'email')
            expect(this.response.body.details[0]).toHaveProperty('location', 'body')
        })
    
        test('is expected to respond with error when email format is invalid', async () => {
            // Prepare a user object with an invalid email format
            let user = {
                name: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: 'invalid-email-format',
                password: faker.internet.password({ length: 8 })
            }
    
            // Send a POST request to the register endpoint
            this.response = await request(app).post('/api/v1.0/auth/register').send(user)
    
            // Common Expects For Error
            commonExpectsForError(this.response)

            // Check if the response contains the expected error message
            expect(this.response.body.message).toBe('Missing or invalid params')
            expect(this.response.body.details).toBeDefined()
            expect(this.response.body.details.length).toBe(1)
            expect(this.response.body.details[0]).toHaveProperty('type', 'field')
            expect(this.response.body.details[0]).toHaveProperty('value', user.email)
            expect(this.response.body.details[0]).toHaveProperty('msg', 'Email is required')
            expect(this.response.body.details[0]).toHaveProperty('path', 'email')
            expect(this.response.body.details[0]).toHaveProperty('location', 'body')
        })
    
        test('is expected to respond with error when password is too short', async () => {
            // Prepare a user object with a short password
            let user = {
                name: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                password: 'short' // Less than 8 characters
            }
    
            // Send a POST request to the register endpoint
            this.response = await request(app).post('/api/v1.0/auth/register').send(user)
    
            // Common Expects For Error
            commonExpectsForError(this.response)

            // Check if the response contains the expected error message
            expect(this.response.body.message).toBe('Missing or invalid params')
            expect(this.response.body.details).toBeDefined()
            expect(this.response.body.details.length).toBe(1)
            expect(this.response.body.details[0]).toHaveProperty('type', 'field')
            expect(this.response.body.details[0]).toHaveProperty('value', user.password)
            expect(this.response.body.details[0]).toHaveProperty('msg', 'Password must be at least 8 characters long')
            expect(this.response.body.details[0]).toHaveProperty('path', 'password')
            expect(this.response.body.details[0]).toHaveProperty('location', 'body')
        })
    })

})

