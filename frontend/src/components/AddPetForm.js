import React, { useState } from 'react'
import DefultInput from './Form/DefultInput'
import { createPet } from '../services/api';
import { replace, useNavigate } from 'react-router-dom'
import DropDown from './Form/DropDown';
import DefultBtn from './Button/DefultBtn';

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
            const response = await createPet(petdata);  
    
            if(response.data.Status === "Success"){
                alert(response.data.Message)
                window.location.reload()
                navigate('/', {replace: true} )
                
            }
            else{
                alert(response.data.Error)
            }
        } catch (err) {
            console.error("Error during request:", err);
            alert("An error occurred while creating the pet.");
        }
    };
    
    
    


    return (
        <div>
            <div className='add-form'>
                <h4 className='form-title'>Add New Pet</h4>

                <form method='POST' onSubmit={handleCreatePet}>
                    <div className='form-grid'>
                        <DefultInput
                            label={"Enter Pet Name"}
                            type={'text'}
                            name={'name'}
                            value={petdata.name}
                            requried={true}
                            placeholder={"Pet Name"}
                            onChange={handleInputChange}
                        />

                        <DropDown
                            label="Select Species"
                            name="species"
                            value={petdata.species}
                            onChange={handleInputChange}
                            options={[
                                'dog',
                                'cat',
                                'bird',
                                'pig'
                            ]}
                            required
                        />

                        <DefultInput
                            label={"Enter Pet Age"}
                            type={'number'}
                            name={'age'}
                            value={petdata.age}
                            requried={true}
                            placeholder={"Pet Age"}
                            onChange={handleInputChange}
                        />

                        <DropDown
                            label="Select Personality"
                            name="personality"
                            value={petdata.personality}
                            onChange={handleInputChange}
                            options={[
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
                            ]}
                            required
                        />
                    </div>

                    <div>
                        <DefultBtn
                            type={'submit'}
                            text='Create New Pet'
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddPetForm