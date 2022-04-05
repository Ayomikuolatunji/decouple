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
      creator: { name:" name "}
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

