const express = require('express');
const OPTController = require('../controllers/OPTController');

const router = express.Router();

router.post('/quiz', OPTController.getQuizResult)

module.exports = router;