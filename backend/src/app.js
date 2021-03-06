const express = require('express')
const cors = require('cors')
const { errors } = require('celebrate')
const routes = require('./routes') 

const app = express()

app.use(cors()) // só isso pq o projeto está em desenvolvimento
//se fosse produção
// app.use(cors({
//     origin: 'http://meuapp.com'
// }))

app.use(express.json())
app.use(routes)
app.use(errors())

// app.listen(3333)
module.exports = app
