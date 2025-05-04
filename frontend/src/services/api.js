import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/pet'; 

// create pet
export const createPet = async (data) => {
    return await axios.post(`${API_BASE_URL}`, data)
}

// get all pets
export const getallpets = async () => {
    return await axios.get(`${API_BASE_URL}`)
}

// get one pet
export const getOnePet = async (id) => {
    return await axios.get(`${API_BASE_URL}/${id}`)
}

// update pet
export const updatePet = async (id, data) => {
    return await axios.put(`${API_BASE_URL}/${id}`, data)
}

// delete pet
export const deletePet = async (id) => {
    return await axios.delete(`${API_BASE_URL}/${id}`)
}

// adoptPet
export const adoptPet = async (id) => {
    return await axios.patch(`${API_BASE_URL}/${id}/adopt`)
}

// filter my mood pet
export const filterPetMood = async (mood) => {
    return await axios.get(`${API_BASE_URL}/filter?mood=${mood}`)
}


// API BASE URL for Bonus Features (Optional)

const API_BASE_URL_OPTIONAL = 'http://localhost:5000/optionaltask'; 

export const quizMatch = async (data) => {
    return await axios.post(`${API_BASE_URL_OPTIONAL}/quiz`, data)
}

export const getCertificate = async (id, data) => {
    return await axios.post(`${API_BASE_URL_OPTIONAL}/getCertificate/${id}`, data, { responseType: 'blob' })
}