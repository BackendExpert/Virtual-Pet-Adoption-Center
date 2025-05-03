import React, { useState } from 'react'
import { createPet } from '../services/api';
import { useNavigate } from 'react-router-dom'
import DefultInput from './Form/DefultInput';
import DefultButton from './Buttons/DefultButton';
import Dropdown from './Form/Dropdown';


const AddPetForm = () => {
    const navigate = useNavigate()
    const [petdata, setpetdata] = useState({
        name: '',
        species: '',
        age: '',
        personality: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setpetdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCreatePet = async (e) => {
        e.preventDefault();

        try {
            console.log(petdata)
            const response = await createPet(petdata);

            if (response.data.Status === "Success") {
                alert(response.data.Message)
                window.location.reload()
                navigate('/', { replace: true })

            }
            else {
                alert(response.data.Error)
            }
        } catch (err) {
            console.error("Error during request:", err);
            alert("An error occurred while creating the pet.");
        }
    };
    return (
        <div className='mt-8'>
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h1 className="text-gray-500 font-semibold text-xl">Create New Pet</h1>

                <div className="my-4">
                    <form onSubmit={handleCreatePet} method="post">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="">
                                <DefultInput
                                    label={"Enter Pet Name"}
                                    name={'name'}
                                    value={petdata.name}
                                    required
                                    placeholder={"Pet age"}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <Dropdown
                                    onChange={handleInputChange}
                                    label="Select Species"
                                    name="species"
                                    options={[
                                        { value: "dog", label: "Dog" },
                                        { value: "cat", label: "Cat" },
                                        { value: "bird", label: "Bird" },
                                        { value: "pig", label: "Pig" },
                                    ]}
                                />
                            </div>
                            <div className="">
                                <DefultInput
                                    label={"Enter Pet Age"}
                                    name={'age'}
                                    value={petdata.age}
                                    required
                                    placeholder={"Pet age"}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <Dropdown
                                    label="Select Personality"
                                    name="personality"
                                    onChange={handleInputChange}
                                    options={[
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
                                />
                            </div>
                        </div>

                        <div className="">
                            <DefultButton
                                btntype={'submit'}
                                text='Create New Pet'
                            />
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default AddPetForm