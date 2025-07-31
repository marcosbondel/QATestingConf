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
const { app } = require('../../../src/config/app')
const request = require('supertest')
const MongooseConnection = require('../../../src/config/database')
const { faker } = require('@faker-js/faker')

describe('GET /', () => {
    beforeEach(async() => {
        // Reset any necessary state before each test
        this.response = await request(app).get('/');
    });

    it('is expected to respond with right app information', async () => {
        // Common Expects For Success
        expect(this.response.statusCode).toBe(200);
        expect(this.response.headers).toHaveProperty('content-type', 'application/json; charset=utf-8');

        expect(this.response.body).toHaveProperty('name', 'qatestingconf');
        expect(this.response.body).toHaveProperty('version', '1.0.0');
        expect(this.response.body).toHaveProperty('author', 'Marcos Bonifasi');
        expect(this.response.body).toHaveProperty('license', 'MIT');
    });
});

describe('GET /v1.0.0/auth/register', () => {

    beforeAll(async() => {
        await MongooseConnection.connect()
    });

    beforeEach(async() => {
        // Reset any necessary state before each test
        let user = {
            name: "Test",
            lastname: "User",
            email: faker.internet.email(),
            password: "password123"
        }

        this.response = await request(app).post('/api/v1.0/auth/register').send(user);
    });

    it('is expected to respond with right auth register information', async () => {
        // Common Expects For Success
        expect(this.response.statusCode).toBe(200);
        expect(this.response.headers).toHaveProperty('content-type', 'application/json; charset=utf-8');

        // expect(this.response.body).toHaveProperty('message', 'Register endpoint is working');
    });
});