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

            // check at least one input feild have value

            if(name === undefined && species === undefined && age === undefined && personality === undefined){
                return  res.json({ Error: "Please Provid at least one input..."})
            }

            // update only feild that data have

            if (name !== undefined) checkpet.name = name;
            if (species !== undefined) checkpet.species = species;
            if (age !== undefined) checkpet.age = age;
            if (personality !== undefined) checkpet.personality = personality;

            const updatepet = await checkpet.save()

            if(updatepet) {
                return res.json({ Status: "Success", Message: "Pet Updated Success"})
            }
            else{
                return res.json({ Error: "Internal server Error while Updating the Pet..."})
            }
        }
        catch(err){
            console.log(err)
        }
    },

    // adoptPet

    petAdopt: async(req, res) => {
        try{
            const id = req.params.id
            
            const checkpet = await Pet.findById(id)

            if(!checkpet){
                return res.json({ Error: "No Pet Found"})
            }

            checkpet.adopted = true
            checkpet.adoption_date = new Date() 

            const updatePetAdopt = await checkpet.save()

            if(updatePetAdopt){
                return  res.json({ Status: "Success", Message: "Pet Adopt Updated Success"})
            }
            else{
                return res.json({ Error: "Error While Updating Pet"})
            }

        }
        catch(err){
            console.log(err)
        }
    },

    // delete pet
    
    deletePet: async(req, res) => {
        try{
            const id = req.params.id

            const checkpet = await Pet.findById(id)

            if(!checkpet){
                return res.json({ Error: "Pet Not Found"})
            }

            // delete pet

            const petdelete = await Pet.findByIdAndDelete(id)

            if(petdelete){
                return res.json({ Status:"Success", Message: "Pet Deleted Success"})
            }
            else{
                return res.json({ Error: "Error While Deleting Pet"})
            }
        }
        catch(err){
            console.log(err)
        }
    },

    // Filter Pets by Mood

    filterPet: async(req, res) => {
        try{
            const mood = req.query

            if(!mood){
                return re.json({ Error: "Mood is Requrired"})
            }

            const getpet = await Pet.find({ mood: mood })

            if(getpet.length === 0){
                return res.json({ Error: "No Pet Found by given specified mood"})
            }

            return res.json({ Result: getpet, Message: "Pets found..."})
        }
        catch(err){
            console.log(err)
        }
    }

};

module.exports = petController;