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
      return res.status(422).json({
        message: 'Validation failed, entered data is incorrect.',
        errors: errors.array()
      });
    }
    const title = req.body.title;
    const content = req.body.content;
    const name=req.body.creator.name
    const imageUrl=req.body.imageUrl
    const post = new Post({
      title: title,
      content: content,
      imageUrl:"https://adio-agro-img.s3.eu-west-3.amazonaws.com/8366222.jpg",
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
        console.log(err);
      });
}

