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
    const asset = json.assetts.find(ast => ast.id === index)
    res.render('./assets/view', asset)
  })
})

// EDIT asset

routes.get('/assets/edit/:id', (req, res) => {
  const index = Number(req.params.id)
  const filename = path.join(__dirname, 'data.json')
  fs.readFile(filename, (err, contents) => {
    if (err) return console.log(err)
    const json = JSON.parse(contents)
    const asset = json.assets.find(ast => ast.id === index)
    res.render('./assets/edit', asset)
  })
})

// POST update
routes.post('/assets/edit/:id', (req, res) => {
  const { host_name, ip_address, subnet_mask, default_gateway, live } = req.body
  const id = Number(req.params.id)
  const edit = {
    id: id,
    host_name: host_name,
    ip_address: ip_address
    subnet_mask: subnet_mask,
    default_gateway: default_gateway,
    live: live
  }
  editAsset(edit, 'data', err => {
    if (err) return res.sendStatus(500)
    res.redirect(`/assets/${id}`)
  })
})

// EDIT asset
funtion editAsset (assetInfo, file, callback) {
  // open data.json
  const filename = path.join(__dirname, file + '.json')
  fs.readFile(filename, 'uft-8', (err, contents) => {
    if (err) return callback(new Error('Unable to load data file'))

    // parse object
    const json = JSON.parse(contents)
    let itemInfo = json.assets.find(ast => ast.id === assetInfo.id)
    console.log(assetInfo)
    itemInfo.host_name = assetInfo.host_name
    itemInfo.ip_address = assetInfo.ip_address
    itemInfo.subnet_mask = assetInfo.subnet_mask
    itemInfo.default_gateway = assetInfo.default_gateway 
    itemInfo.live = assetInfo.live

    // stringify array
    const assetStr = JSON.stringify(json, null, 2)

    //save the file to hard drive
    fs.writeFile(filename, assetStr, 'utf-8', callback)
    
  })
}
