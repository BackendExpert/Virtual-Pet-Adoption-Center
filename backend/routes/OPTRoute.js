const express = require('express');
const OPTController = require('../controllers/OPTController');

const router = express.Router();

router.get('/quiz', OPTController.getQuizResult)

module.exports = router;