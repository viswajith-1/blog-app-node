const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')

// Blog Routes

router.get('/create', blogController.blog_create_view) 
router.post('/create', blogController.blog_create)
router.get('/topics', blogController.blogs_view_all)
router.get('/:id', blogController.blog_view_details)
router.delete('/delete/:id', blogController.blog_delete)

module.exports = router;