const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    species: {
        type: String,
        enum: [
                'dog',
                'cat', 
                'bird', 
                'pig'
            ],
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    personality: {
        type: String,
        enum: [
                'Friendly', 
                'Shy', 
                'Playful', 
                'Aggressive', 
                'Lazy', 
                'Energetic', 
                'Curious', 
                'Protective', 
                'Loyal', 
                'Independent'
            ], // only these personality can add to system (no Defult is Friendly)
        default: 'Friendly',
        required: true
    },
    mood: {
        type: String,
        enum: [
            'Happy',
            'Excited',
            'Sad'
        ],
        required: true,
    },
    adopted: {
        type: Boolean,
        required: true,
        default: false
    },
    adoption_date: {
        type: Date,
    }
}, {timestamps: true }); //timestamps can get created date and time and also latest update date and time

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;