const bcrypt = require('bcrypt')
const users = require('../models/userModel')

// register
exports.registerController = async (req, res) => {
  console.log("inside registerController");
  console.log(req.body);
  const { username, email, password } = req.body

  try {
    // check email is in DB
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return res.status(409).json("User Already Exist.. Please Login!!!")
    }

    // insert new document to DB
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
    // check email is in DB
    const existingUser = await users.findOne({ email })
    if (!existingUser) {
      return res.status(404).json("Invalid Email.. Please Register!!!")
    }

    // compare entered password with the hashed one
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch) {
      return res.status(401).json("Invalid Password!!!")
    }

    // send user details without the password
    const { password: _pw, ...safeUser } = existingUser.toObject()
    return res.status(200).json({ user: safeUser })
  } catch (err) {
    console.log(err);
    return res.status(500).json(err)
  }
}

// edit user
// edit admin