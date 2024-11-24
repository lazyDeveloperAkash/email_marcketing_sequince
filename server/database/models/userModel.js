const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userModel = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, "username already in use"],
        requared: [true, "username is Required"],
        minLength: [3, "username Contain atleast 3 character"],
        maxLength: [20, "username Contain atleast 20 character"],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: [true, "Email is already in use!"],
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed more than 15 characters"],
        minLength: [5, "Password should have atleast less than 5 characters"]
        // match[]
    },
    refreshToken:{
        type: String
    }

});

userModel.pre("save", function () {
    if (!this.isModified("password")) return;
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

userModel.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userModel.methods.getJWTTokens = function () {
    const accessToken = JWT.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    })

    const refreshToken = JWT.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    })
    return { accessToken, refreshToken };
}

module.exports = mongoose.model("user", userModel);