const express = require('express')
const fs = require('fs')
const path = require('path')
const routes = express.Router()

module.exports = routes

// TEST
routes.get('/foo', (req, res) => {
  res.send('Testing....Foo!')
})

// GET
routes.get('/', (req, res) => {
  res.redirect('/assets')
})

// ASSETTS

routes.get('/assets', (req, res) => {
  const filename = path.join(__dirname, 'data.json')
  fs.readFile(filename,'UTF-8', (err, contents) => {
    if (err) return console.log(err)
    try {
      const json = JSON.parse(contents)
      res.render('./assets/index', json)
    } catch {
      console.log('something went wrong')
    }
  })
})

// GET /assets/:id

routes.get('assets/:id', (req, res) => {
  const index = Number(req.params.id) 
  const filename = path.join(__dirname, 'data.json')
  fs.readFile(filename, 'utf-8', (err, contents) => {
    if (err) return console.log(err)
    const json = JSON.parse(contents)
    const asset = json.assetts
  })
})




//Get viewData

//Write Edits? - a bit unsure about writefile

//ROUTES

//REDIRECT

//DATA TO INDEX to Main.hbs

//DATA TO INDIVIDUAL INSTANCES 
