require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/db')
const router = require('./routes/allRoutes')

const bookStoreServer = express()

bookStoreServer.use(cors())
bookStoreServer.use(express.json())
bookStoreServer.use(router)

const PORT = 3000

bookStoreServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})