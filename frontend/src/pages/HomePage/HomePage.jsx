import React, { useState } from 'react'
import AddPetForm from '../../components/AddPetForm'
import PetList from '../../components/PetList'
import PetCard from '../../components/PetCard'

const HomePage = () => {
    const [selectedPetId, setSelectedPetId] = useState(null); // State to track selected pet

    // Function to handle the selection of a pet
    const handleViewPet = (petId) => {
        setSelectedPetId(petId);
    };

    return (
        <div className='xl:px-40 md:px-10 px-4 md:pt-20 pt-16 bg-gray-200/60 min-h-screen pb-16'>
            <h1 className="text-center md:text-4xl text-xl font-semibold text-gray-500">Virtual Pet Adoption Center</h1>

            <div className="">
                <AddPetForm />
            </div>

            {/* selected id is when user click view on petlist and then get the id from there */}
            {selectedPetId && (
                <div className="mt-8">
                    <PetCard petId={selectedPetId} />
                </div>
            )}

            <div className="">
                <PetList onPetClick={handleViewPet} />
            </div>
        </div>
    )
}

export default HomePage;
