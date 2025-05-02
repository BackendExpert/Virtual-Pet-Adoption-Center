const Pet = require("../models/petModel");

const petController = {
    
    // create pet

    createPet: async(req, res) => {
        try{
            // get user inputs

            // i use this 3 inputs because of mood, adopted and adoption_date have defult value so no need to add by adder 
            const {
                name,
                species,
                age,
                personality
            } = req.body

            // check the pet is already in database
            const checkpet = await Pet.findOne({ name: name })

            if(checkpet){
                return res.json({ Error: "Pet Already Exists By Given Name"})
            }

            // if pet not Exists 

            const newPet = new Pet({
                name: name,
                species: species,
                age: age,
                personality: personality
            })

            const resultNewPet = await newPet.save()

            if(resultNewPet){
                return res.json({ Status: "Success", Message: "Pet Added Successful"})
            }
            else{
                return res.json({ Error: "Internal Server Error while Adding Pet to System"})
            }
        }
        catch(err){
            console.log(err)
        }
    },

    // get all pets

    allpets: async(req, res) => {
        try{
            const pets = await Pet.find()

            return res.json({ Result: pets, Message: "Getting all Pets on the System" })
        }
        catch(err){
            console.log(err)
        }
    },

    // get one pet according to id

    getSinglePet: async(req, res) => {
        try{
            const id = req.params.id

            const getpet = await Pet.findById(id)

            if(getpet){
                return res.json({ Result: getpet, Message: "Get pet"})
            }
            else{
                return res.json({ Error: "No Pet Found by ID"})
            }
        }
        catch(err){
            console.log(err)
        }
    },

    // update pet

    updatePet: async(req, res) => {
        try{    
            const id = req.params.id

            const {
                name,
                species,
                age,
                personality
            } = req.body

            const checkpet = await Pet.findById(id)

            if(!checkpet){
                return res.json({ Error: "Pet Cannot find by Give ID" })
            }


        }
        catch(err){
            console.log(err)
        }
    }

};

module.exports = petController;