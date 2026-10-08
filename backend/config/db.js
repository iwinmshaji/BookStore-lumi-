const mongoose = require('mongoose')

const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString)
  .then(() => {
    console.log("MongoDB Atlas connected successfully")
  })
  .catch((err) => {
    console.log("MongoDB connection failed")
    console.log(err)
  })