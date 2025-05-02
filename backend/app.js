// required packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// database connection file
const ConnectDB = require('./config/DB')

// routes
const petRoute = require('./routes/petRoute')

// call for database connection fuction
ConnectDB()

const app = express();
app.use(cors());
app.use(express.json());


app.use('/pet', petRoute)


module.exports = app