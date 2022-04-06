const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts =async(req, res, next) => {

  try{
    const currentPage = req.query.page || 1;
    const perPage = 2;
    const totalItems=await  Post.find().countDocuments()
    const posts=await Post.find()
    .skip((currentPage - 1) * perPage)
    .limit(perPage);
    res.status(200).json({
      message: 'Fetched posts successfully.',
      posts: posts,
      totalItems: totalItems
    });
  }catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

exports.createPost = async(req, res, next) => {
  try{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  let creator;
  
  const post =new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId
  });
  post.save()
   const user=await User.findById(req.userId);
   creator = user;
   user.posts.push(post);
   user.save();
   res.status(201).json({
    message: 'Post created successfully!',
    post: post,
    creator: { _id: creator._id, name: creator.name }
  });
  }catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async(req, res, next) => {
     try{
      const postId = req.params.postId;
      const post=await  Post.findById(postId)
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Post fetched.', post: post });
     }catch(error){
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); 
     }
};

exports.updatePost =async(req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  try{
    const postId = req.params.postId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
     const post= await Post.findById(postId)
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      post.save();
      res.status(200).json({ message: 'Post updated!', post: post });
     }catch(error){
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deletePost =async(req, res, next) => {
  try{
    const postId = req.params.postId;
     const post=await Post.findById(postId)
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }
      // Check logged in user
      clearImage(post.imageUrl);
      await Post.findByIdAndRemove(postId);    
     const user= await User.findById(req.userId);
      user.posts.pull(postId);
      user.save();
      res.status(200).json({ message: 'Deleted post.' });
  }catch(err){
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
