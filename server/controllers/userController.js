const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const userModel = require("../database/models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { token } = require("../utils/token");
const JWT = require('jsonwebtoken');
const agenda = require("../utils/Agenda");

exports.loggedinUser = catchAsyncErrors(async (req, res, next) => {
    const user = await userModel.findById(req.id);
    res.status(200).json({ user })
})

exports.signup = catchAsyncErrors(async (req, res, next) => {
    const { email, userName, password } = req.body;

    // null value check
    const nullField = [email, userName, password].some((field)=>field?.trim() === "");
    if(nullField) return next(new ErrorHandler(`Please provide ${nullField} field !`));

    //create an user
    const user = await new userModel(req.body).save();
    await token(user, 201, res);
});

exports.signin = catchAsyncErrors(async (req, res, next) => {
    const { emailOruserName, password } = req.body;

    // null value check
    const nullField = [email, userName, password].some((field)=>field?.trim() === "");
    if(nullField) return next(new ErrorHandler(`Please provide ${nullField} field !`));

    const user = await userModel.findOne({ $or: [{ userName: emailOruserName }, { email: emailOruserName }] }).select("+password");

    if (!user) return next(new ErrorHandler("User not found with this email address!", 404));
    const isMatch = user.comparePassword(password);
    if (!isMatch) return next(new ErrorHandler("Wrong Password", 500));
    token(user, 200, res);
});

exports.signout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: "Successfully Singout!" });
});

exports.generateAccessToken = catchAsyncErrors(async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return next(new ErrorHandler("refresh token not found!", 404));

    const { id } = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!id) return next(new ErrorHandler("invalid refresh token!", 401));

    //get refresh token from database
    const user = await userModel.findById(id);;

    //compare incoming and database refresh token
    if (user?.refreshToken !== refreshToken) return next(new ErrorHandler("invalid refresh expiered!", 401));

    token(user, 200, res);
});

exports.hello = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "hello" })
});

exports.scheduleEmail = catchAsyncErrors(async (req, res, next) => {
    const { email, subject, body, time } = req.body;

    // Validate the input
    if (!email || !subject || !body || !time) return next(new ErrorHandler(`${!email ? 'email' : !subject ? 'subject' : !body ? 'body' : 'time'} is null`));

    // Schedule the email
    const responce = await agenda.schedule(time, 'send-email', { email, subject, body });

    if (!responce) return next(new ErrorHandler('Failed to schedule email!', 401));
    res.status(200).json({ message: 'Email scheduled successfully!' });
});