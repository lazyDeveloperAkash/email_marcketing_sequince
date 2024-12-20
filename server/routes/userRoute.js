const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { signup, signin, signout, loggedinUser, generateAccessToken, hello, scheduleEmail } = require("../controllers/userController");

router.get('/hello', hello);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/access-token', generateAccessToken);

// authenticated routes
router.get('/user', isAuthenticated, loggedinUser);
router.get('/signout', isAuthenticated, signout);
router.post('/schedule-email', isAuthenticated, scheduleEmail);

module.exports = router;