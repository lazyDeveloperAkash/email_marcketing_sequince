const JWT = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const userModel = require("../database/models/userModel");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { accessToken } = req.cookies;
    // console.log(req.cookies)

    if (!accessToken) return next(new ErrorHandler('Unauthorized: No access token!', 401));

    // decode access token
    const { id } = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!id) return new ErrorHandler("Unauthorized: access token not valid!", 401);

    const user = await userModel.findById(id).select("-password -refreshToken")

    if (!user) return new ErrorHandler("Unauthorized: access token not valid!", 401);

    req.id = user?._id;
    next();
})