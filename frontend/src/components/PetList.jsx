import React, { useEffect, useState } from 'react';
import { adoptPet, getallpets, deletePet } from '../services/api';
import { formatDate } from '../utils/Helper';
import { MdMenu, MdDashboard } from "react-icons/md";
import FilterBar from './FilterBar';
import '../App.css';

const PetList = ({ onPetClick }) => {
    const [petdata, setpetdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [btndatavalue, setbtndatavalue] = useState("list");
    const [filterPersonality, setFilterPersonality] = useState('');
    const [deletingPetId, setDeletingPetId] = useState(null);
    const [adoptingPetId, setAdoptingPetId] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getallpets();
                if (response && response.data && Array.isArray(response.data.Result)) {
                    setpetdata(response.data.Result);
                } else {
                    console.error("Data is not in array format:", response);
                    setpetdata([]);
                }
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        };

        fetchPets();
    }, []);

    useEffect(() => {
        if (!filterPersonality) {
            setFilteredData(petdata);
        } else {
            setFilteredData(petdata.filter(pet => pet.personality === filterPersonality));
        }
    }, [petdata, filterPersonality]);

    const scrollToTop = () => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        setDeletingPetId(id);
        try {
            await deletePet(id);
            setTimeout(() => {
                setpetdata(prev => prev.filter(pet => pet._id !== id));
                setDeletingPetId(null);
            }, 500); // Wait for animation to finish
        } catch (error) {
            console.error("Error deleting pet:", error);
            setDeletingPetId(null);
        }
    };

    const handleAdopt = async (id) => {
        setAdoptingPetId(id);
        try {
            await adoptPet(id);
            setpetdata(prev =>
                prev.map(pet =>
                    pet._id === id ? { ...pet, adopted: true } : pet
                )
            );
            setTimeout(() => setAdoptingPetId(null), 500); // Remove pulse effect
        } catch (error) {
            console.error("Error adopting pet:", error);
            setAdoptingPetId(null);
        }
    };

    return (
        <div className="mt-4">
            <div className="my-4">
                <FilterBar selected={filterPersonality} onChange={setFilterPersonality} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between mx-4">
                    <h1 className="md:block hidden text-xl font-semibold text-gray-500">All Available and Adopted Pets</h1>
                    <div className="flex gap-2">
                        <button onClick={() => setbtndatavalue("list")} className="text-xl">
                            <MdMenu className='fill-gray-500' />
                        </button>
                        <button onClick={() => setbtndatavalue("grid")} className="text-xl">
                            <MdDashboard className='fill-gray-500' />
                        </button>
                    </div>
                </div>
            </div>

            {btndatavalue === 'list' ? (
                <div className='bg-white mt-4 p-4 shadow-lg rounded-lg'>
                    <table className="w-full">
                        <thead>
                            <tr className='text-gray-500 border-b border-gray-200 h-12'>
                                <th className='md:hidden table-cell'>Pet Data</th>
                                <th className='md:table-cell hidden'>#</th>
                                <th className='md:table-cell hidden'>Pet Name</th>
                                <th className='md:table-cell hidden'>Species</th>
                                <th className='md:table-cell hidden'>Age</th>
                                <th className='md:table-cell hidden'>Personality</th>
                                <th className='md:table-cell hidden'>Adopt Status</th>
                                <th className='md:table-cell hidden'>Adopt Date</th>
                                <th className=''>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((data, index) => (
                                    <tr
                                        key={index}
                                        className={`h-16 border-b border-gray-300 pet-card transition-opacity duration-500 ${deletingPetId === data._id ? 'opacity-0' : 'opacity-100'} ${adoptingPetId === data._id ? 'animate-pulse' : ''}`}
                                    >
                                        <td className='md:hidden table-cell'>
                                            <div className="py-4">
                                                <p className="font-semibold">Pet Name: <span className='text-blue-500'>{data.name}</span></p>
                                                <p className="font-semibold">Species : <span className='text-blue-500'>{data.species}</span></p>
                                                <p className="font-semibold">Age : <span className='text-blue-500'>{data.age}</span></p>
                                                <p className="font-semibold">Personality: <span className='text-blue-500'>{data.personality}</span></p>
                                                <div className="font-semibold">
                                                    {data.adopted ? <div className="text-red-500">Adopted</div> : <div className="text-green-500">Available</div>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center md:table-cell hidden font-semibold'>{index + 1}</td>
                                        <td className='text-center md:table-cell hidden'>{data.name}</td>
                                        <td className='text-center md:table-cell hidden'>{data.species}</td>
                                        <td className='text-center md:table-cell hidden'>{data.age}</td>
                                        <td className='text-center md:table-cell hidden'>{data.personality}</td>
                                        <td className='text-center md:table-cell hidden font-semibold'>
                                            {data.adopted ? <div className="text-red-500">Adopted</div> : <div className="text-green-500">Available</div>}
                                        </td>
                                        <td className='md:table-cell hidden text-center'>{data.adoption_date ? formatDate(data.adoption_date) : "-"}</td>
                                        <td className='text-center space-x-2'>
                                            <button
                                                onClick={() => {
                                                    scrollToTop();
                                                    onPetClick(data._id);
                                                }}
                                                className='bg-blue-500 text-white rounded py-1 px-3 hover:bg-blue-600'>
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleDelete(data._id)}
                                                className='bg-red-500 text-white rounded py-1 px-3 hover:bg-red-600'>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-gray-500">
                                        No pets available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                    {filteredData.map((data, index) => (
                        <div
                            key={index}
                            className={`bg-white p-4 rounded-lg shadow-md pet-card transition-opacity duration-500 
                            ${deletingPetId === data._id ? 'opacity-0' : 'opacity-100'} 
                            ${adoptingPetId === data._id ? 'animate-pulse' : ''}`}
                        >
                            <h2 className="text-lg font-bold text-gray-700">{data.name}</h2>
                            <p className="text-gray-600">Species: {data.species}</p>
                            <p className="text-gray-600">Age: {data.age}</p>
                            <p className="text-gray-600">Personality: {data.personality}</p>
                            <p className={`font-semibold ${data.adopted ? 'text-red-500' : 'text-green-500'}`}>
                                {data.adopted ? "Adopted" : "Available"}
                            </p>
                            <p className="text-gray-500 text-sm">Adoption Date: {data.adoption_date ? formatDate(data.adoption_date) : '-'}</p>
                            <div className="mt-4 space-y-2">
                                <button
                                    className={`w-full py-2 rounded text-white ${data.adopted ? 'bg-gray-400' : 'bg-green-500'}`}
                                    onClick={() => handleAdopt(data._id)}
                                    disabled={data.adopted}
                                >
                                    {data.adopted ? "Adopted" : "Adopt"}
                                </button>
                                <button
                                    onClick={() => {
                                        scrollToTop();
                                        onPetClick(data._id);
                                    }}
                                    className='w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                                    View
                                </button>
                                <button
                                    onClick={() => handleDelete(data._id)}
                                    className='w-full py-2 bg-red-500 text-white rounded hover:bg-red-600'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PetList;
