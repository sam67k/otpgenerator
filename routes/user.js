const express = require('express')

const router = express.Router();

const userController = require('../controllers/user');

// post /users/ createUser
router.post('/', userController.addUser)

// post /users/generateOTP generateOTP
router.post('/generateOTP', userController.generateOTP)

// get /users/:user_id/verifyOTP?otp= verifyOTP
const verifyOTProuter = express.Router({ mergeParams: true })
router.use('/:user_id', verifyOTProuter)
verifyOTProuter.get('/verifyOTP', userController.verifyOTP)

module.exports = router