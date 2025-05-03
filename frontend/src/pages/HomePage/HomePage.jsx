import React from 'react'
import AddPetForm from '../../components/AddPetForm'
import PetList from '../../components/PetList'

const HomePage = () => {
    return (
        <div className='xl:px-40 md:px-10 px-4 md:pt-20 pt-16 bg-gray-200/60 min-h-screen pb-16'>
            <h1 className="text-center md:text-4xl text-xl font-semibold text-gray-500">Virtual Pet Adoption Center</h1>

            <div className="">
                <AddPetForm />
            </div>

            <div className="">
                <PetList />
            </div>

        </div>
    )
}

export default HomePage