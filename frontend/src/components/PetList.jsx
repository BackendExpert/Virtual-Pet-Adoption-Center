import React, { useEffect, useState } from 'react';
import { adoptPet, getallpets } from '../services/api';
import { formatDate } from '../utils/Helper';
import { MdMenu, MdDashboard } from "react-icons/md";
import FilterBar from './FilterBar';

const PetList = ({ onPetClick }) => {
    const [petdata, setpetdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [btndatavalue, setbtndatavalue] = useState("list");
    const [filterPersonality, setFilterPersonality] = useState('');

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

    // for filter pets

    useEffect(() => {
        if (!filterPersonality) {
            setFilteredData(petdata);
        } else {
            setFilteredData(petdata.filter(pet => pet.personality === filterPersonality));
        }
    }, [petdata, filterPersonality]);

    // when the user click the button automtically srcoll up
    // because of the view and update form will be appear in top of the page after add pet
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                                    <tr className='h-16 border-b border-gray-300' key={index}>
                                        <td className='md:hidden table-cell'>
                                            <div className="py-4">
                                                <p className="font-semibold">Pet Name: <span className='text-blue-500'>{data.name}</span></p>
                                                <p className="font-semibold">Species : <span className='text-blue-500'>{data.species}</span></p>
                                                <p className="font-semibold">Age : <span className='text-blue-500'>{data.age}</span></p>
                                                <p className="font-semibold">Personality: <span className='text-blue-500'>{data.personality}</span></p>
                                                <div className="font-semibold">
                                                    {
                                                        data.adopted === false ?
                                                            <div className="text-green-500">Available</div>
                                                            :
                                                            <div className="text-red-500">Adopted</div>
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center md:table-cell hidden font-semibold'>{index + 1}</td>
                                        <td className='text-center md:table-cell hidden'>{data.name}</td>
                                        <td className='text-center md:table-cell hidden'>{data.species}</td>
                                        <td className='text-center md:table-cell hidden'>{data.age}</td>
                                        <td className='text-center md:table-cell hidden'>{data.personality}</td>
                                        <td className='text-center md:table-cell hidden font-semibold'>
                                            {
                                                data.adopted === false ?
                                                    <div className="text-green-500">Available</div>
                                                    :
                                                    <div className="text-red-500">Adopted</div>
                                            }
                                        </td>
                                        <td className='md:table-cell hidden text-center'>{data.adoption_date ? formatDate(data.adoption_date) : "-"}</td>
                                        <td className='text-center'>
                                            <button
                                                className={`text-white px-3 py-1 rounded ${data.adopted ? 'text-red-500 font-semibold' : 'bg-green-500'}`}
                                                onClick={() => adoptPet(data._id)}
                                                disabled={data.adopted}
                                            >
                                                {data.adopted ? "Adopted" : "Adopt"}
                                            </button>

                                            <button
                                                onClick={() => {
                                                    scrollToTop();
                                                    onPetClick(data._id);
                                                }}
                                                className='ml-2 bg-blue-500 text-white rounded py-1 px-4 duration-500 hover:bg-blue-500'>
                                                View
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
                    {filteredData.length > 0 ? (
                        filteredData.map((data, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold text-gray-700">{data.name}</h2>
                                <p className="text-gray-600">Species: {data.species}</p>
                                <p className="text-gray-600">Age: {data.age}</p>
                                <p className="text-gray-600">Personality: {data.personality}</p>
                                <p className={`font-semibold ${data.adopted ? 'text-red-500' : 'text-green-500'}`}>
                                    {data.adopted ? "Adopted" : "Available"}
                                </p>
                                <p className="text-gray-500 text-sm">Adoption Date: {data.adoption_date ? formatDate(data.adoption_date) : '-'}</p>
                                <button
                                    className={`mt-3 w-full py-2 rounded text-white ${data.adopted ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                                    onClick={() => adoptPet(data._id)}
                                    disabled={data.adopted}
                                >
                                    {data.adopted ? "Adopted" : "Adopt"}
                                </button>

                                <button
                                    onClick={() => {
                                        scrollToTop();
                                        onPetClick(data._id);
                                    }}
                                    className='mt-1 w-full bg-blue-500 text-white rounded py-1 px-4 duration-500 hover:bg-blue-500'>
                                    View
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No pets available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PetList;
