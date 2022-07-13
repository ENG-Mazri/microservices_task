const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')
require('dotenv').config()

const PORT = process.env.PORT | 4444
const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', proxy('http://localhost:3333'))
app.use('/notes', proxy('http://localhost:5000'))
app.use('/', proxy('http://localhost:4444'))



app.listen(PORT , ()=>console.log(`Gateway API server is listening on ${PORT}`))