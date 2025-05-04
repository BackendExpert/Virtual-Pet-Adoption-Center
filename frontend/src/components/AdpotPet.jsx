import React, { useEffect, useState } from 'react';
import { getCertificate, getOnePet } from '../services/api';
import DefultInput from './Form/DefultInput';
import DefultButton from './Buttons/DefultButton';
import { triggerConfetti } from '../utils/Helper';

const AdoptPet = ({ PetID }) => {
    const [onepet, setonepet] = useState(null);
    const [error, setError] = useState(null);

    const [adoptby, setadpotby] = useState({
        byadopt: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setadpotby((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleAdoptBy = async (e) => {
        e.preventDefault();

        try {
            // Fetch the adoption certificate from the backend
            const response = await getCertificate(PetID, adoptby);

            // Check if the response is successful
            if (response.status === 200) {
                triggerConfetti(); //  Show confetti
            
                // ... your existing PDF logic
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const disposition = response.headers['content-disposition'];
                let filename = `Adoption_Certificate_${adoptby.byadopt}.pdf`;
                if (disposition && disposition.includes('filename=')) {
                    filename = disposition.split('filename=')[1].replace(/["']/g, '');
                }
            
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            
                // Optional: Delay reload to let user see the confetti
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                // Handle if there is an issue with the response
                alert("Failed to generate certificate. Please try again.");
            }
        } catch (err) {
            console.error("Error generating certificate:", err);
            alert("An error occurred. Please try again later.");
        }
    };


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
        <div className="md:flex">
            <div className="p-6 rounded-2xl md:w-1/3 shadow-2xl bg-gradient-to-br from-white to-gray-50 mt-6 border border-gray-200">
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

            <div className="md:ml-4 ml-0 md:w-2/3 p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-50 mt-6 border border-gray-200">
                <h1 className="text-gray-500 font-semibold">To Adopt this Pet Please fill form</h1>

                <form onSubmit={headleAdoptBy} method="post">
                    <div className="my-2">
                        <DefultInput
                            label={"Enter your name for Adopt"}
                            type={'text'}
                            name={'byadopt'}
                            value={adoptby.byadopt}
                            required
                            placeholder={"Enter Your Name"}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="my-2">
                        <DefultButton
                            btntype={'submit'}
                            text='Adpot this Pet & Genarate the Certificate'
                        />
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AdoptPet;

