const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const {protect} = require('../middlewares/auth')


router.post('/register', userController.registrasi)
router.post('/login', userController.login)
router.get('/profile', protect, userController.profile)
router.post('/refresh-token', userController.refreshToken)


module.exports = router