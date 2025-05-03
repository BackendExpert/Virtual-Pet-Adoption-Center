import React, { useEffect, useState } from 'react'
import { getOnePet } from '../services/api'
import { formatDate } from '../utils/Helper';

const PetCard = ({ petId }) => {
    const [pet, setPet] = useState([]);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const res = await getOnePet(petId);
                setPet(res.data.Result);
            } catch (err) {
                setError('Failed to fetch pet data');
            }
        };

        if (petId) fetchPet();
    }, [petId]);

    return (
        <div className='bg-white p-8 rounded-xl shadow-xl my-4'>
            <div className='text-gray-500'>
                <h2 className='text-2xl font-bold mb-2 '>{pet?.name}</h2>
                <p className='mb-1'><span className='font-semibold'>Age:</span> {pet?.age}</p>
                <p className='mb-1'><span className='font-semibold'>Personality:</span> {pet?.personality}</p>
                <p className='mb-1'><span className='font-semibold'>Species:</span> {pet?.species}</p>
                <p className='mb-1'><span className='font-semibold'>Mood:</span> {pet?.mood}</p>

                <div className="">
                    {
                        pet?.adopted === true ? 
                        <div className="text-red-500 font-semibold">Adopted</div>
                        :
                        <div className="text-green-500 font-semibold">Not Adopted</div>
                    }
                </div>

                <div className="">
                    {
                        pet?.adopted === true ? 
                        <div className="text-blue-500 font-semibold">{formatDate(pet?.adoption_date)}</div>
                        :
                        <div className=""></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PetCard