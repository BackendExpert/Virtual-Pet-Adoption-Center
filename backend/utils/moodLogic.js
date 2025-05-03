const Pet = require("../models/petModel")

function getMood(createAt) {
    const now = new Date()
    const created = new Date(createAt)
    const daysinMs = now - created
    const diffracedays = daysinMs / (1000 * 60 * 60 * 24)
    
    if(diffracedays < 1) return "Happy"
    else if(diffracedays <= 3) return "Excited"
    else return "Sad"
}

async function UpdateMoodforAllPets() {
    const pets = await Pet.find()

    for (const pet of pets) {
        const mood = getMood(pet.createdAt);
        if (pet.mood !== mood) {
            pet.mood = mood;
            await pet.save();
        }
    }
}

module.exports = { getMood, UpdateMoodforAllPets }