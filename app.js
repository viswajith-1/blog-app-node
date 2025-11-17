const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const blogRoutes = require('./routes/blogRoutes')

const dbURL = process.env.DB_URL

const Blog = require('./models/blogs')
const Contact = require('./models/contact') 

const app = express()
app.use (express.urlencoded({ extended: true }))

mongoose.connect(dbURL)
  .then(() => {
    console.log('connected to db') 
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(3000)
console.log('Server is running on http://localhost:3000')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  Blog.find()
    .then((result) => {
      res.render('index', { blogs: result })
    })
    .catch((err) => {
      console.log(err)
    })
})


app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(blogRoutes);

app.post('/contact', (req, res) => {
  console.log(req.body)
  const contact = new Contact(req.body)
  contact.save()
    .then((result) => {
      res.redirect('/')
      console.log('Contact Form Submitted')
    } )
    .catch((err) => {
      console.log(err)
    })
})




