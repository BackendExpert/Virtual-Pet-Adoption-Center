import React, { useEffect, useState } from 'react';

import { getOnePet } from '../services/api';

const AdoptPet = ({ PetID }) => {
    const [onepet, setonepet] = useState(null);
    const [error, setError] = useState(null);

    const [adoptby, setadpotby] = useState({
        adoptby: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setpetdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleAdoptBy = (e) => {
        e.preventDefault();

        try{
            
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const res = await getOnePet(PetID);

                if (res && res.data && res.data.Result) {
                    setonepet(res.data.Result);
                } else {
                    setError("No pet data found or unexpected response format");
                }
            } catch (error) {
                console.error("Error fetching pet data:", error);
                setError("Failed to fetch pet data");
            }
        };

        if (PetID) {
            fetchPetData();
        }
    }, [PetID]);

    return (
        <div className="p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-50 mt-6 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                🐾 Pet Information
            </h3>

            {error ? (
                <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg shadow-sm">
                    {error}
                </div>
            ) : onepet ? (
                <div className="space-y-3">
                    <h4 className="text-xl font-bold text-indigo-600">{onepet.name}</h4>
                    <p className="text-gray-700"><strong>Species:</strong> {onepet.species || "Unknown"}</p>
                    <p className="text-gray-700"><strong>Age:</strong> {onepet.age || "Not specified"}</p>
                    <p className="text-gray-700"><strong>Personality:</strong> {onepet.personality || "Not specified"}</p>
                    <p className="text-gray-700"><strong>Mood:</strong> {onepet.mood || "No description available."}</p>
                </div>
            ) : (
                <p className="text-gray-500 italic">Loading pet data...</p>
            )}
        </div>

    );
};

export default AdoptPet;
