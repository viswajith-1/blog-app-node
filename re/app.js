const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const dbURL = process.env.DB_URL

const Blog = require('../models/blogs')
const Contact = require('../models/contact') 

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

app.get('/topics', (req, res) => {

  const searchQuery = req.query.search;
  let filter = {};


  if (searchQuery) {
    filter = {
      $or: [

        { title: { $regex: searchQuery, $options: 'i' } },
        { snippet: { $regex: searchQuery, $options: 'i' } },
        { author: { $regex: searchQuery, $options: 'i' } }
      ]
    };
  }

  Blog.find(filter).sort({ createdAt: -1 }) 
    .then((result) => {
      res.render('topics', { 
        blogs: result,
        search: searchQuery || '' 
      });
    })
    .catch((err) => {
      console.log(err);
      res.render('topics', { blogs: [], search: searchQuery || '' });
    });
});

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/create', (req, res) => {
  res.render('create')
})

app.post('/create', (req, res) => {
  console.log(req.body)
  const blog = new Blog(req.body)
  blog.save()
    .then((result) => {
      res.redirect('/')
      console.log('Blog Created')
    }
    )
    .catch((err) => {
      console.log(err)
    })})

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

app.get('/:id', (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then((result) => {
      res.render('blog', { blog: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/' })
    })
    .catch((err) => {
      console.log(err)
    })
})




