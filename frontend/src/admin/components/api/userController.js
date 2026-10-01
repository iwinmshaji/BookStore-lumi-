const users = require('../models/userModel')
const bcrypt = require('bcrypt')

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
// edit user
// edit admin