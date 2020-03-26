const express = require('express')
const fs = require('fs')
const path = require('path')
const routes = express.Router()

module.exports = routes

// GET
routes.get('/foo', (req, res) => {
  res.send('Testing....Foo!')
})

// asdfmkasfn