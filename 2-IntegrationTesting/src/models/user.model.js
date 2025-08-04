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
const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
},{
    timestamps: true,
    versionKey: false
});

UserSchema.methods.encryptPassword = async function(plainPassword = this.password) {
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(plainPassword, salt)
    } catch (err) {
        throw new Error('Error encrypting password: ' + err.message)
    }
}

UserSchema.methods.verifyPassword = async function(password = "") {
    if (!password) {
        throw new Error("No password provided for verification.")
    }

    try {
        return await bcrypt.compare(password, this.password)
    } catch (err) {
        throw new Error("Error verifying password: " + err.message)
    }
}

UserSchema.methods.toJSON = function(){
    const { __v, password, ...user} = this.toObject();
    return user;
}

exports.User = model('User', UserSchema)