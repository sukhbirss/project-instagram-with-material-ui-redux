const Post = require('./../models/postModel');
const catchAsync = require('./../util/catchAsync');


exports.post = catchAsync(async(req,res,next) => {
  console.log('post')
	 const newPost = await Post.create({
    name: req.body.name,
    text: req.body.text,
    photo: req.body.picurl,
    postedBy: req.user.id

  });


   console.log(newPost);
	 //const token = jwt.sign({ id: newUser.id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});

	
  res.status(200).json({
  	status:'success',
  	newPost
  })

});

exports.getPosts = catchAsync(async(req,res,next) => {
  
  let post =  await Post.find({postedBy:{$in:req.user.following}}).sort('-createdAt')
  
  if(post.length!==0){
    
      res.status(200).json({
        status:'success',
        post
      })
  }
  else{
    
  post =  await Post.find({postedBy:req.user._id}).sort('-createdAt')
  console.log(post)

  res.status(200).json({
        status:'success',
        post
      })
  }
  

});


exports.deleteMyPost = catchAsync(async(req,res,next) => {
  console.log("delete  operation")
  if(req.user.id===req.body.postedById){
  const post = await Post.findByIdAndDelete(req.body.id);

  res.status(200).json({
    status:'success',
    data: null
  })
 }
 else{

  res.status(500).json({
    status:'postedById not equal to user id',
    data: null
  })
 }

})

exports.getMyPosts = catchAsync(async(req,res,next) => {
  
  const post = await Post.find({postedBy:req.user.id})
  console.log(post)
  res.status(200).json({
    status:'success',
    post
  })

})

exports.likes = catchAsync(async(req,res,next) => {
  console.log("this",req.user.id)
  
   const post = await Post.findByIdAndUpdate(req.body.id,{
        $push:{likes:req.user._id}
    },{
        new:true
    });

  console.log("liking the post",post)
  res.status(200).json({
    status:'success',
    post
  })
})

exports.unLikes = catchAsync(async(req,res,next) => {
  
   const post = await Post.findByIdAndUpdate(req.body.id,{
    $pull:{likes:req.user._id}
    },
    {new:true});
    
  console.log("unlikng the post",post)
    res.status(200).json({
     status:'success',
     post
  })

})