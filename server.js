const express = require('express')
const hbs = require('express-handlebars')

const server = express()
module.exports = server

const routes = require('./routes')

server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Middleware
server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
server.set('view engine', 'hbs')



server.use('/', routes)
