const Pet = require("../models/petModel");

const petController = {
    createPet: async(req, res) => {
        try{
            // get user inputs

            // i use this 3 inputs because of personality, mood, adopted and adoption_date have defult value so no need to add by adder 
            const {
                name,
                species,
                age
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
                age: age
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

    allpets: async(req, res) => {
        try{
            const pets = await Pet.find()

            return res.json({ Result: pets, Message: "Getting all Pets on the System" })
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = petController;