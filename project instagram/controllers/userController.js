const User = require('./../models/userModel');
const Post = require('./../models/postModel');
const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getUser = catchAsync(async(req,res,next) => {
  user = req.user
  res.status(200).json({
    status:'success',
    user
  })

});
exports.getAllUser = catchAsync(async(req,res,next) => {
  user = await User.find();
  res.status(200).json({
    status:'success',
    user
  })

});

exports.getUserData = catchAsync(async(req,res)=>{
  console.log(req.params.id,"/////////////////////////////")
  const user = await User.find({_id:req.params.id}).select("-password")
  
  const posts = await Post.find({postedBy:req.params.id})  

  console.log(user,posts)
  res.json({user,posts})
})

exports.addFollower = catchAsync(async(req,res,next) => {
 	
    const user = await User.findByIdAndUpdate(req.user.id,{
        $push:{following:req.body.id}
    },{
        new:true
    });
    await User.findByIdAndUpdate(req.body.id,{
        $push:{follower:req.user.id}
    },{
        new:true
    });

  console.log(user,"//////////////",req.body.id)
  res.status(200).json({
    status:'success',
    user
  })
});
exports.unfollow = catchAsync(async(req,res,next) => {
 	
    const user = await User.findByIdAndUpdate(req.user.id,{
        $pull:{following:req.body.id}
    },{
        new:true
    });
 	 await User.findByIdAndUpdate(req.body.id,{
        $pull:{follower:req.user.id}
    },{
        new:true
    });

  console.log(user,req.body.id)
  res.status(200).json({
    status:'success',
    user
  })
});
exports.getFollower = catchAsync(async(req,res,next) => {
  const user = await User.findByIdAndUpdate(req.user.id).populate({path:'follower',select:'name photo'});
  console.log(user)
  res.status(200).json({
    status:'success',
    user
  })

});
exports.getFollowing = catchAsync(async(req,res,next) => {
  const user = await User.findByIdAndUpdate(req.user.id).populate({path:'following',select:'name photo'});
  console.log(user)
  res.status(200).json({
    status:'success',
    user
  })

});

exports.updateMe = catchAsync(async (req, res, next) => {

  const filteredBody = filterObj(req.body.data, 'name', 'email','photo');
  console.log(req.body.data,filteredBody)
  // 3) Update user document

  if(req.body.data.password !== undefined)
  {
      const user = await User.findById(req.user.id);
      user.password = req.body.data.password;
      user.passwordConfirm = req.body.data.password;
      await user.save();

      res.status(200).json({
      status: 'success',
      
    });
  }
  else
    {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  }
});