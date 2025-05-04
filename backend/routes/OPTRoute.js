const express = require('express');
const OPTController = require('../controllers/OPTController');

const router = express.Router();

// route for quiz 
router.post('/quiz', OPTController.getQuizResult)

// route for genarate adpot Certificate
router.post('/getCertificate/:id', OPTController.adpotCertificate)

module.exports = router;