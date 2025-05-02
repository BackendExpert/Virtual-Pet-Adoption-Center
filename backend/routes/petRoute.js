const express = require('express');
const petController = require('../controllers/petController');

const router = express.Router();

// in app.js file i use
// app.use('/pet', petRoute)

// so i not use pet in here

// create pet
router.post('/', petController.createPet)

// get all pets
router.get('/', petController.allpets)

// get single pet
router.get('/:id', petController.getSinglePet)

// update pet
router.put('/:id', petController.updatePet)

// Adopt a Pet
router.patch('/:id/adopt', petController.petAdopt)

// delete pet
router.delete('/:id', petController.deletePet)



module.exports = router;