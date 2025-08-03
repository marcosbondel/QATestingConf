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

const CompanySchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },

    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 200
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },

    website: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        validate: {
            validator: function (v) {
                return /^(https):\/\/[^ "]+$/.test(v);
            },
            message: 'Invalid URL format'
        }
    },

    industry: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },

    established: {
        type: Date,
    },

    businessType: {
        type: String,
        required: true,
        enum: ['B2C', 'B2B', 'C2C', 'C2B'],
    },

}, {
    timestamps: true
})

CompanySchema.methods.toJSON = function(){
    const { __v, ...company} = this.toObject();
    return company;
}

exports.Company = model('Company', CompanySchema)