const express = require('express');
const petController = require('../controllers/petController');

const router = express.Router();

// create pet
router.post('/pet', petController.createPet)

// get all pets
router.get('/pet', petController.allpets)

// get single pet
router.get('/pet/:id', petController.getSinglePet)




module.exports = router;