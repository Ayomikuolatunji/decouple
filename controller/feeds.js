const {validationResult}=require("express-validator")

exports.getPosts=(req,res,next)=>{
    res.status(200).json({
        posts: [
          {
            _id: '1',
            title: 'First Post',
            content: 'This is the first post!',
            imageUrl: 'images/duck.jpg',
            creator: {
              name: 'Maximilian'
            },
            createdAt: new Date()
          }
        ]
      });
}

exports.createPost=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(422)
       .json({message:'validation failed, entered incorrect data', errors:errors.array()})
    }
    const title=req.body.title
    const name=req.body.name
    res.status(201).json({title:title, date: new Date().toISOString(), name:name})
}

