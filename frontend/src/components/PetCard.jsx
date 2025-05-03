import React, { useState, useEffect } from 'react';
import { getOnePet, updatePet } from '../services/api';  // ✅ Ensure correct imports
import { useNavigate } from 'react-router-dom';
import { FaCircleXmark } from "react-icons/fa6";
import DefultInput from './Form/DefultInput';
import Dropdown from './Form/Dropdown';
import DefultButton from './Buttons/DefultButton';
import { formatDate } from '../utils/Helper';

const PetCard = ({ petId }) => {
    const [petdata, setPetdata] = useState({
        name: '',
        species: '',
        personality: '',
        age: '',
        adopted: null, // Initialize adopted here
        adoption_date: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const res = await getOnePet(petId);
                const { name, species, personality, age, adopted, adoption_date } = res.data.Result;
                setPetdata({ name, species, personality, age, adopted, adoption_date });
            } catch (err) {
                console.error('Failed to fetch pet data', err);
            }
        };

        if (petId) fetchPet();
    }, [petId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPetdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAdoptedChange = () => {
        setPetdata((prevData) => ({
            ...prevData,
            adopted: !prevData.adopted, // Toggle adopted value
        }));
    };

    const handleUpdatePet = async (e) => {
        e.preventDefault();

        try {
            const response = await updatePet(petId, petdata);
            if (response.data.Status === "Success") {
                alert(response.data.Message);
                window.location.reload();
                navigate('/', { replace: true });
            } else {
                alert(response.data.Error);
            }
        } catch (err) {
            console.error("Error during request:", err);
            alert("An error occurred while updating the pet.");
        }
    };

    return (
        <div>
            <div className="flex justify-end mr-4" onClick={() => window.location.reload()}>
                <FaCircleXmark className="text-red-500 text-xl cursor-pointer" />
            </div>

            <div className="md:flex">
                {/* Display Pet Info */}
                <div className="bg-white p-8 rounded-xl shadow-xl my-4 w-1/3">
                    <div className="text-gray-500">
                        <h2 className="text-2xl font-bold mb-2 ">{petdata.name}</h2>
                        <p className="mb-1"><span className="font-semibold">Age:</span> {petdata.age}</p>
                        <p className="mb-1"><span className="font-semibold">Personality:</span> {petdata.personality}</p>
                        <p className="mb-1"><span className="font-semibold">Species:</span> {petdata.species}</p>
                        <div className="">
                            {petdata.adopted === true ? (
                                <div className="text-red-500 font-semibold">Adopted</div>
                            ) : petdata.adopted === false ? (
                                <div className="text-green-500 font-semibold">Not Adopted</div>
                            ) : null}
                        </div>

                        {/* Display adoption date only if adopted */}
                        <div className="">{petdata.adopted === true && petdata.adoption_date && (
                            <div className="text-blue-500 font-semibold">
                                Adopted at: {formatDate(petdata.adoption_date)}
                            </div>
                        )}</div>
                    </div>
                </div>

                {/* Update Pet Form */}
                <div className="bg-white p-8 rounded-xl shadow-xl my-4 md:ml-2 w-full">
                    <h1 className="text-xl font-semibold text-gray-500 mb-4">Update Pet</h1>

                    <form onSubmit={handleUpdatePet} className="space-y-4">
                        {/* Pet Name Input */}
                        <div>
                            <DefultInput
                                label={"Enter Pet Name"}
                                name={'name'}
                                value={petdata.name}
                                required
                                placeholder={"Pet name"}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Pet Species Dropdown */}
                        <div>
                            <Dropdown
                                label="Select Species"
                                name="species"
                                options={[
                                    { value: "dog", label: "Dog" },
                                    { value: "cat", label: "Cat" },
                                    { value: "bird", label: "Bird" },
                                    { value: "pig", label: "Pig" },
                                ]}
                                value={petdata.species}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Pet Age Input */}
                        <div>
                            <DefultInput
                                label={"Enter Pet Age"}
                                name={'age'}
                                value={petdata.age}
                                required
                                placeholder={"Pet age"}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Pet Personality Dropdown */}
                        <div>
                            <Dropdown
                                label="Select Personality"
                                name="personality"
                                options={[
                                    { value: "", label: "Select Personality" },
                                    { value: "Friendly", label: "Friendly" },
                                    { value: "Shy", label: "Shy" },
                                    { value: "Playful", label: "Playful" },
                                    { value: "Aggressive", label: "Aggressive" },
                                    { value: "Lazy", label: "Lazy" },
                                    { value: "Energetic", label: "Energetic" },
                                    { value: "Curious", label: "Curious" },
                                    { value: "Protective", label: "Protective" },
                                    { value: "Loyal", label: "Loyal" },
                                    { value: "Independent", label: "Independent" },
                                ]}
                                value={petdata.personality}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Adopted Checkbox */}
                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={petdata.adopted || false}
                                    onChange={handleAdoptedChange}
                                />
                                <span>Adopted</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <DefultButton type="submit" text="Update Pet" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
