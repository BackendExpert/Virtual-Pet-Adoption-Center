const Pet = require("../models/petModel");

// this Controller for all Bonus Features (Optional)

const OPTController = {

    // get result of quiz
    getQuizResult: async(req, res) => {
        try{
            // answers of quiz
            const quizAnswers = req.body.traits;

            const matchedPets = await Pet.find({
                personality: { $in: quizAnswers },
                adopted: false
            })

            res.json({ Status: 'Success', Result: matchedPets });
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = OPTController;