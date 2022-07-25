const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const roleModel = require('../models/roleModel');
const { request } = require('http');

const signToken = async id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createAndSendToken = async (user, statusCode, res) => {  
   const token = await signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 
    ),
    httpOnly: true
  };
  // In production save cookie only in https connection
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // Remove password from the output
  user.password = undefined;
 
  console.log(statusCode);
   res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async(req, res, next) => { 

  console.log(req.body.companyId);
  const company = await Company.findOne({_id:req.body.companyId});
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,    
    role: req.body.role,   
    isSuperAdmin: false,
    status:"Active",   
    createdOn: new Date(Date.now()),
    updatedOn: new Date(Date.now()),
    company:company._id
  }); 
  createAndSendToken(newUser, 201, res);
});
exports.CreateUser = catchAsync(async(req, res, next) => {    
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    phone: req.body.phone,
    isSuperAdmin: false,
    status:"Active",
    createdOn: new Date(),
    updatedOn: new Date(),
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy,
    company:company.company._id
  }); 
  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${process.env.WEBSITE_DOMAIN}/updateuser/${newUser._id}`;
  const message = `Welcome, Please go on : ${resetURL} \n and update your profile `;
  try {
    await sendEmail({
      email: newUser.email,
      subject: 'Update your profile',
      message
    });
    res.status(200).json({
      status: 'success',
      message: 'update profile link sent to email!'
    });
  } catch (err) {   
    return next(
      new AppError(
        'There was an error sending the email. Try again later.',
        500
      )
    );
  }
  createAndSendToken(newUser, 201, res);
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError(`Email or password not specified.`, 400));
  }
  // 2) Check if user exitsts && password is correct
  // Password is hidden for selection (select: false)
  // So we need to explicitly select it here
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`Incorrect email or password.`, 401));
  }

  // 3) If everything ok, send token to client
  createAndSendToken(user, 200, res);
});

// Authentication
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get the token and check if it's there
  // It is a standard to send header in this format
  // Key: Authorization
  // Value: Bearer <TOKEN_VALUE>
  console.log('protected');
  console.log(req.headers.authorization);
  let token;  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If token wasn't specified throw an error
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Token verification
  // jwt.verify(token, process.env.JWT_SECRET) takes in a callback
  // In order to not brake our async await way to deal with async code
  // We can transform it into a promise using promisify from util pckg
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );

  // 4) Check if user changed password after the token was issued
  // iat stands for issued at
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password. Please log in again.', 401)
    );
  }
  // Grant access to protected route
  req.user = currentUser;
  next();
});

// Authorization
// IMPORTANT: We can use closure if we want to pass parameter to a function but
// do not run it.
// exports.restrictTo = (...roles) => {
//   console.log('calling restrictTo');
//   return (req, res, next) => {
//     // roles ['admin', 'lead-guide'] role='user'
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError('You do not have permission to perform this action', 403)
//       );
//     }

//     next();
//   };
// };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  
  // Deactivate all validators - thanks to it, we don't have to specify email
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${process.env.WEBSITE_DOMAIN}/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL} \nIf you didn't forget your password, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10min)',
      message
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Try again later.',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
    const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  
    const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
 
  // 2) If token has not expired, and there is user, set the new password
  if (!user) return next(new AppError('Token is invalid or has expired', 400));
  
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // It is set every time that password property changes

  // 4) Log the user in, send JWT
  createAndSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {

  // 1) Get user from collection
  const user = await User.findById(req.body.id).select('+password');
  // 2) Check if POSTed current password is correct
  console.log("hii");
  console.log(req.body.password);
  console.log(req.body.passwordCurrent);
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  console.log(req.body.password)
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createAndSendToken(user, 200, res);
});
exports.updateUserbyinvitation = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.body.id); 
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.address= req.body.passwordConfirm;
  user.jobTitle=req.body.jobTitle;
  user.city=req.body.city;
  user.state=req.body.state;
  user.country=req.body.country;
  user.pincode=req.body.pincode;
  user.phone=req.body.phone;
  user.extraDetails=req.body.extraDetails;
  await user.save();
  // 4) Log user in, send JWT
  createAndSendToken(user, 200, res);
});
