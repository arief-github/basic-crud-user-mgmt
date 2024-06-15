// import express validator
const { body } = require('express-validator')

// import prisma
const prisma = require('../../prisma/client')

// define validation for user
const validateUser = [
    body('name').notEmpty().withMessage('Name is Required'),
    body('email')
        .notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Invalid Email')
        .custom(async (value, { req }) => {
            if(!value) {
                throw new Error('Email is required')
            }

            const user = await prisma.user.findUnique({ where: { email: value }})

            if (user && user.id !== Number(req.params.id)) {
                throw new Error('Email already exists');
            }

            return true
        }),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = { validateUser }