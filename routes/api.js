const express = require("express");
const router = express.Router();
const authRouter = require('./auth/auth.controller')
const userRouter = require('./user/user.controller')

router.use('/auth', authRouter)
router.use('/user', userRouter)

module.exports = router;
