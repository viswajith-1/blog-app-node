const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require("path");


const Blog = require('../models/blogs');
const Contact = require('../models/contact');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use(express.urlencoded({ extended: true }));

// Set EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "../views"));

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Connect to DB (only once)
const { connectDB } = require("./db");
connectDB();


// ROUTES
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render('index', { blogs });
  } catch (err) {
    console.log(err);
  }
});

app.get('/topics', async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    let filter = {};

    if (searchQuery) {
      filter = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { snippet: { $regex: searchQuery, $options: "i" } },
          { author: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.render("topics", { blogs, search: searchQuery });
  } catch (err) {
    console.log(err);
    res.render("topics", { blogs: [], search: "" });
  }
});

app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/create', (req, res) => res.render('create'));

app.post('/create', async (req, res) => {
  try {
    await Blog.create(req.body);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

app.post('/contact', async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

app.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('blog', { blog });
  } catch (err) {
    console.log(err);
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ redirect: '/' });
  } catch (err) {
    console.log(err);
  }
});

// Export for Vercel
module.exports = serverless(app);
