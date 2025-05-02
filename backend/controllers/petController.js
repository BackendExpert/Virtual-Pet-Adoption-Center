const petController = {
    createPet: async(req, res) => {
        try{
            // get user inputs

            // i use this 3 inputs because of personality, mood, adopted amd adoption_date have defult value so no need to add by adder 
            const {
                name,
                species,
                age
            } = req.body
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = petController;