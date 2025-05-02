const express = require('express');
const petController = require('../controllers/petController');
const { route } = require('../app');

const router = express.Router();

// create pet
router.post('/pet', petController.createPet)

// get all pets
router.get('/pet', petController.allpets)

module.exports = router;