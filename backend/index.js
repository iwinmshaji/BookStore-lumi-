// Import all packages
const express = require('express')
const cors = require('cors')

// Load .env file contents into process.env by default
require('dotenv').config()

const routes = require('./routes/allRoutes')
require('./config/db')

// Create server
const server = express()

// Enable CORS
server.use(cors())

// Parse JSON request bodies
server.use(express.json())

// Use routes
server.use(routes)

// Port
const PORT = process.env.PORT

// Start server
server.listen(PORT, () => {
  console.log('Server Started......')
})