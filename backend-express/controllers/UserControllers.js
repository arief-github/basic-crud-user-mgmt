// import express
const express = require('express')

// import prisma
const prisma = require('../prisma/client')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

// function find users
const findUsers = async (req, res) => {
    try {
        // get all users from database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: {
                id: "desc"
            }
        })

        // send response
        res.status(200).send({
            success: true,
            message: "get all users success",
            data: users,
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// create user controller
const createUser = async (req, res) => {
    // checking validation result
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation Error",
            errors: errors.array()
        })
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try {
        // inserting data
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        })

        res.status(201).send({
            success: true,
            message: "User Created Successfully",
            data: user
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// get user by ID
const findUserById = async (req, res) => {
    // get id from params
    const { id } = req.params;

    try {
        
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        res.status(200).send({
            success: true,
            message: "get user success",
            data: user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// function update user
const updateUser = async (req, res) => {  
    // get ID from params
    const { id } = req.params

    // checking validation result
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation Error",
            errors: errors.array()
        })
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
        })

        res.status(200).send({
            success: true,
            message: "User Updated Successfully",
            data: user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// delete user function
const deleteUser = async (req, res) => {
    // get id from params
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).send({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal Server 500',
            error: error.message
        })
    }
}

module.exports = { findUsers, createUser, findUserById, updateUser, deleteUser }