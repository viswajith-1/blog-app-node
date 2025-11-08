const express = require('express')
const mongoose = require('mongoose')

const app = express()
mongoose.connect(dbURL)
  .then(() => {
    console.log('connected to db') 
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(3000)

const dbURL = 'mongodb+srv://viswajith:viswajith123@nodetuts.enqsepu.mongodb.net/?appName=nodetuts'

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})
