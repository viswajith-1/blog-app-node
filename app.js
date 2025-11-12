const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const dbURL = process.env.DB_URL

const app = express()
mongoose.connect(dbURL)
  .then(() => {
    console.log('connected to db') 
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(3000)

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

app.get('/create', (req, res) => {
  res.render('create')
})
