const express = require('express');
const cors = require('cors');
const ConnectDB = require('./config/DB')
require('dotenv').config();


ConnectDB()

const app = express();
app.use(cors());
app.use(express.json());


module.exports = app