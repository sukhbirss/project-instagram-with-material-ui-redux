const Comment = require('./../models/commentModel');
const catchAsync = require('./../util/catchAsync');
const Post = require('./../models/postModel');


exports.postComment = catchAsync(async(req,res,next) => {
  console.log('comment posting')
  console.log(req.body.post)
	 const newComment = await Comment.create({
    text: req.body.comment,
    post:req.body.post,
    user:req.user.id,
    username:req.user.name
  });


   console.log(newComment);
	 //const token = jwt.sign({ id: newUser.id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});

  const post = await Post.findById(req.body.post)
  res.status(200).json({
  	status:'success',
  	newComment,
    post
  })

});
exports.getComments = catchAsync(async(req,res,next) => {

  const post = await Post.findById(req.params.postId).populate({path:'comment',select:'text comment photo Like'});

  res.status(200).json({
    status:'success',
    post
  })

})