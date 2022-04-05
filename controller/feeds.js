const {validationResult}=require("express-validator");
const Post=require("../model/post");

exports.getPosts=(req,res,next)=>{
    Post.find()
      .then(data=>{
        res.status(200).json({
            posts: [data]
          });
      })
      .catch(err=>{
          console.log(err)
      })
}

exports.createPost=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error=new Error("Validation failed, entered data is incorrect.")
         error.statusCode=422
        throw error
    }
    const title = req.body.title;
    const content = req.body.content;
    const name=req.body.creator.name
    const imageUrl=req.body.imageUrl
    const post = new Post({
      title: title,
      content: content,
      imageUrl:imageUrl,
      creator: { name:name}
    });
    post
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          post: result
        });
      })
      .catch(err => {
           if(!err.status){
              err.statusCode=500
           }
           next(err)
      });
}

exports.getPost=(req,res,next)=>{
     const postId=req.params.postId
     Post.findById(postId)
     .then(data=>{
         if(!data){
            const error=new Error(`Post with the ${postId} does not exits`)
            error.statusCode=404;
            throw error
         }
         res.status(200).json({message:"post fetched", post:data})
     })
     .catch(err=>{
         if(!err.status){
             err.statusCode=404
         }
         next(err)
     })
}


exports.updatePost=(req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error=new Error("Validation failed, entered data is incorrect.")
       error.statusCode=422
      throw error
  }
  const postId=req.params.postId
  const title=req.body.title
  const imageUrl=req.body.imageUrl
  const content=req.body.content
  const name=req.body.creator.name
  Post.findById(postId)
    .then(post=>{
       if(!post){
        const error=new Error(`Post does not exits`)
        error.statusCode=404;
        throw error
       }
       post.title=title
       post.content=content
       post.imageUrl=imageUrl
       post.creator={name:name}
       return post.save()
    })
    .then(post=>{
      res
      .status(200)
      .json({message:"Updated succcessfully", post})
    })
    .catch(err=>{
        if(!err.status){
          err.statusCode=422
        }
        next()
    })
}