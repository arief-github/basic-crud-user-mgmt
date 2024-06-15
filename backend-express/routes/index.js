// import express
const express = require('express')

// initialize express router
const router = express.Router();

// import register controller
const registerController = require('../controllers/RegisterControllers')
const loginController = require('../controllers/LoginControllers')
const userController = require('../controllers/UserControllers')

// import validation
const { validateRegister } = require('../utils/validators/auth')
const { validateLogin } = require('../utils/validators/auth')
const { validateUser } = require('../utils/validators/user')

// import verifyToken
const verifyToken = require('../middlewares/auth');

// define route

// auth route
router.post('/register', validateRegister, registerController.register)
router.post('/login', validateLogin, loginController.login)

// user route
router.get('/admin/users', verifyToken ,userController.findUsers)
router.get('/admin/users/:id', verifyToken, userController.findUserById)
router.post('/admin/users', verifyToken, validateUser, userController.createUser)
router.put('/admin/users/:id', verifyToken, validateUser, userController.updateUser)
router.delete('/admin/users/:id', verifyToken, userController.deleteUser)

module.exports = router