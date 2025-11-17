const Blog = require('../models/blogs')

// Controller Functions

const blogs_view_all = (req, res) => {

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
}

const blog_view_details = (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then((result) => {
      res.render('blog', { blog: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const blog_create_view = (req, res) => {
  res.render('create')
}

const blog_create = (req, res) => {
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
    })}

const blog_delete = (req, res) => {
  const id = req.params.id
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/' })
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
    blog_create,
    blog_create_view,
    blogs_view_all,
    blog_view_details,
    blog_delete
}