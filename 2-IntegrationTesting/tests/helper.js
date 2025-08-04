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
const { app } = require('../src/config/app')
const request = require('supertest')
const MongooseConnection = require('../src/config/database')
const { faker } = require('@faker-js/faker')
const { User } = require('../src/models/user.model')
const { Company } = require('../src/models/company.model')
const { generateToken } = require('../src/system')
const { UserMock, CompanyMock } = require('./mocks')

// · Initialize Mongoose Connection
MongooseConnection.connect()

// · Common Expects
const commonExpectsForSuccess = (response) => {
    expect(response.statusCode).toBe(200);
    expect(response.headers).toHaveProperty('content-type', 'application/json; charset=utf-8');
    expect(response.body).toHaveProperty('data');
}

const commonExpectsForError = (response) => {
    expect(response.statusCode).toBe(400);
    expect(response.headers).toHaveProperty('content-type', 'application/json; charset=utf-8');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('details');
}

const commonExpectsForNotFound = (response) => {
    expect(response.statusCode).toBe(404);
    expect(response.headers).toHaveProperty('content-type', 'application/json; charset=utf-8');
    expect(response.body).toHaveProperty('message');
}

const commonExpectsForUnauthorized = (response) => {
    expect(response.statusCode).toBe(401);
    expect(response.headers).toHaveProperty('content-type', 'application/json; charset=utf-8');
    expect(response.body).toHaveProperty('message');
}

module.exports = {
    app,
    request,
    faker,
    User,
    Company,
    commonExpectsForSuccess,
    commonExpectsForError,
    commonExpectsForNotFound,
    commonExpectsForUnauthorized,
    generateToken,
    UserMock,
    CompanyMock
}