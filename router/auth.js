const express = require('express')
const controller = require('../controller')
const middleware = require('../middleware')

const router = express.Router()


router.post('/login-with-otp', controller.auth.authWithOtp)

router.post('/login-with-email', controller.auth.authWithEmail)

router.post('/login-with-password', controller.auth.authWithPsd)

router.post('/two-factor-auth', controller.auth.twoFactor)

router.post('/signup', controller.auth.createUser)

router.post('/verify',middleware.auth.verifyToken, controller.auth.verifyUser)


module.exports = router;
