const bcrypt = require('bcrypt')
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// register
exports.registerController = async (req, res) => {
    console.log("inside registerController");
    console.log(req.body);
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(409).json("User Already Exist.. Please Login!!!")
        }

        const encryptPassword = await bcrypt.hash(password, 10)
        const newUser = await users.create({
            username,
            email,
            password: encryptPassword
        })
        return res.status(201).json(newUser)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
}

// login
exports.loginController = async (req, res) => {
    console.log("inside loginController");
    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
            if (isPasswordMatch) {
                const token = jwt.sign(
                    { userMail: email, role: existingUser.role },
                    process.env.JWTSECRET,
                    { expiresIn: '1d' }
                )
                const { password: _pw, ...safeUser } = existingUser.toObject()
                return res.status(200).json({ user: safeUser, token })
            } else {
                return res.status(409).json("Invalid Password..!")
            }
        } else {
            return res.status(409).json("Invalid Email.. Please Register!!!")
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
}

// Google login
exports.googleLoginController = async (req, res) => {
    console.log("inside googleLoginController");
    const { email, password, picture, username } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            // if present
            const token = jwt.sign(
                { userMail: existingUser.email, role: existingUser.role },
                process.env.JWTSECRET,
                { expiresIn: '1d' }
            )
            const { password: _pw, ...safeUser } = existingUser.toObject()
            return res.status(200).json({ user: safeUser, token })
        } else {
            // if not present - register user
            const encryptPassword = await bcrypt.hash(
                password || crypto.randomBytes(16).toString('hex'),
                10
            )
            const newUser = await users.create({
                username,
                email,
                password: encryptPassword,
                picture
            })
            const token = jwt.sign(
                { userMail: newUser.email, role: newUser.role },
                process.env.JWTSECRET,
                { expiresIn: '1d' }
            )
            const { password: _pw, ...safeUser } = newUser.toObject()
            return res.status(200).json({ user: safeUser, token })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
}

// edit user
// edit admin