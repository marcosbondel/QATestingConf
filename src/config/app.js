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
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const morgan = require('morgan')
const { 
    logger,
    respondWithNotFound,
    respondWithInternalServerError
} = require('../system')

const { rootRoutes, companyRoutes } = require('../routes')

// · Setting up express app
const app = express()

// · Setting up Middlewares
// · Server security
app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

// · Setup morgan middleware
const morgan_format = (tokens, req, res) => {
    return [
        `[${tokens.method(req, res)}]`,
        tokens.url(req, res),
        tokens.status(req, res),
        '-',
        tokens['response-time'](req, res), 'ms',
        '-',
        `User-Agent: ${tokens['user-agent'](req, res)}`
    ].join(' ')
}

app.use(morgan(morgan_format, {
    stream: {
        write: message => logger.info(message.trim())
    }
}))

// · Middleware para rutas no encontradas (404)
app.use((req, res, next) => {
    const message = `Endpoint not found: ${req.originalUrl}`
    
    logger.warn(message)

    return respondWithNotFound(res, message)
})

// · Middleware para errores internos del servidor (500)
app.use((err, req, res, next) => {
    logger.error(`Internal server error: ${err.message}`)

    return respondWithInternalServerError(res, err.message, err.details || [])
})

// · Define endpoints and nested
app.use('/', rootRoutes)
app.use('/api', companyRoutes)

module.exports = {
    app
}