const { refreshTokenOptions, accessTokenOptions } = require("./tokenOptions");

exports.token = async(user , statusCode, res) => {
    const { accessToken, refreshToken } = user.getJWTTokens();
    console.log(accessToken)

    // save new refresh token to database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.cookie("refreshToken", refreshToken, refreshTokenOptions)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .status(statusCode).json({ user: user, success: true });
}