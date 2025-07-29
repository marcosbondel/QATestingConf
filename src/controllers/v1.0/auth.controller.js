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
·=
*/

const { 
    respondWithError,
    respondWithSuccess,
    respondWithNotFound,
    logger,
} = require('../../system')

const { request, response } = require("express");
const { UserModel } = require("./../../models")
const bcryptJS = require('bcryptjs');

const login =  async (req = request, res = response) => {
    const {
        name,
        lastname,
        email,
        password
    } = req.body;
    try {
        const newUser = new UserModel({
            name,
            lastname,
            email,
            password
        });

        // Encrypt the password
        await newUser.encryptPassword();
        // Save the user to the database
        const savedUser = await newUser.save();

        if(!savedUser) {
            return respondWithError(res, 'User registration failed', ['Unable to save user']);
        }

        // Respond with success
        return respondWithSuccess(res, 'User registered successfully', savedUser);
    } catch (error) {
        console.log(error);
        logger.error(`Error creating resource: ${error.message}`);
        
        respondWithError(res, 'An error occurred while processing your request', [error.message]);
    }
}

const register =  async (req = request, res = response) => {
    
    try {


    } catch (error) {
        console.log(error);
        logger.error(`Error registeing the user: ${error.message}`);
        respondWithError(res, 'An error occurred while processing your request', [error.message]);
    }
}

const logout = async (req = request, res = response) => {
    try {
        let { id } = req.params;  
        let query = {status: true};
    } catch (error) {
        console.log(error);
        logger.error(`Error creating resource: ${error.message}`);
        respondWithError(res, 'An error occurred while processing your request', [error.message]);
    }
}

module.exports = {
    login,
    register,
    logout
}