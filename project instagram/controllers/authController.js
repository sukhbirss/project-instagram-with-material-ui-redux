const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {JWT_SECRET} = require('./../config/keys');
const User = require('./../models/userModel');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sgMail = require('@sendgrid/mail')
const signToken = id => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    user  
  });
};

const newTransport = ()=>{

    return nodemailer.createTransport({host: process.env.EMAIL_HOST,
                                       port: process.env.EMAIL_PORT,
                                       auth: {
                                        user: process.env.EMAIL_USERNAME,
                                        pass: process.env.EMAIL_PASSWORD
                                      }
                                      })
  }
exports.signup = catchAsync(async(req,res,next) => {
  console.log(req.body.name)
	 const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    typee:req.body.typee,
    username: req.body.username,
    photo:req.body.photo
  });


   console.log(newUser);
	 //const token = jwt.sign({ id: newUser.id},JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});

	
  createSendToken(newUser,200,res);

});

exports.login = catchAsync(async(req,res,next) => {
  const { email,password } = req.body;

  //if email and password exist
  if(!email || !password) {
    return next(new AppError('please provide email n password',400))
  }
  //if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 404));
  }

  //if every thing is ok then send toke back to client

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
 
 console.log(token,"sda")
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
 // 4) Check if user changed password after the token was issued

 console.log("again",currentUser);
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});

exports.forgotPassword = catchAsync(async(req,res,next) => {
  const user = await User.findOne({email : req.body.email})  

  if(!user){
    return next(new AppError('no user with that email',404))
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({validateBeforeSave:false});
    const msg = {
      to:user.email,
      from:"no-replay@sukhinsta.com",
      subject:"password reset",
       html:`
             <p>You requested for password reset</p>
              <h5>click on this link to reset your password <a href="https://sukhinsta.herokuapp.com/reset/${resetToken}">click me</a> to reset password</h5>
              `
    }
      
    newTransport().sendMail(msg);

  res.json({
    status:"success",
    message:"Check Your Email"
  })          

});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {

      return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});
