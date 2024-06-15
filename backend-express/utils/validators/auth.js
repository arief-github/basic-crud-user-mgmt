// import express validator
const { body } = require('express-validator')

// import prisma
const prisma = require('../../prisma/client')

// define validation for register
const validateRegister = [
    body('name').notEmpty().withMessage('Name is Required'),
    body('email')
        .notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Invalid Email')
        .custom(async (value) => {
            const user = await prisma.user.findUnique({ where: { email: value }})

            if (user) {
                throw new Error('Email already exists')
            }

            return true
        }),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]

// define validation for login
const validateLogin = [
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = { validateRegister, validateLogin }