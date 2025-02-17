//import express
const express = require('express')

//init express router
const router = express.Router();

//import PostController
const PostController = require('../controllers/PostController');

//define route for posts
router.get('/posts', PostController.findPosts);

//export router
module.exports = router