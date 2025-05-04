const OPTquizController = {
    // get result of quiz
    getQuizResult: async(req, res) => {
        try{
            // answers of quiz
            const {
                ans1,
                ans2,
                ans3,
                ans4,
                ans5
            } = req.body



        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = OPTquizController;