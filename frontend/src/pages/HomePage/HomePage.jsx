import React, { useEffect, useState } from 'react'
import AddPetForm from '../../components/AddPetForm'
import PetList from '../../components/PetList'
import PetCard from '../../components/PetCard'
import DefultButton from '../../components/Buttons/DefultButton'
import { FaBell } from "react-icons/fa6";
import { getallNotifications } from '../../services/api'

const HomePage = () => {
    const [selectedPetId, setSelectedPetId] = useState(null); // State to track selected pet
    const [showDropdown, setShowDropdown] = useState(false); // for notification dropdown

    // Function to handle the selection of a pet
    const handleViewPet = (petId) => {
        setSelectedPetId(petId);
    };

    // for toggle dropdoen notificaiotns 
    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };
    const [allnotifications, setAllNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await getallNotifications();
                setAllNotifications(res.data.Result || []);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className='xl:px-40 md:px-10 px-4 md:pt-20 pt-16 bg-gray-200/60 min-h-screen pb-16'>

            <h1 className="text-center md:text-4xl text-xl font-semibold text-gray-500">Virtual Pet Adoption Center</h1>

            <div className="flex justify-end mr-4 mt-4">
                <h1 className="mt-2 pr-4 md:block hidden">For Adpot a Pet go to Quiz and Start</h1>
                <a href="/Quiz">
                    <DefultButton
                        btntype={'button'}
                        text='Start Quiz'
                    />
                </a>

                <div className="mx-2 mt-2 cursor-pointer relative" onClick={toggleDropdown}>
                    <FaBell className="fill-gray-500 h-8 w-auto" />

                    <div
                        className={`absolute right-0 mt-6 md:w-96 w-64 bg-blue-100 rounded-xl shadow-lg z-10 p-4 transform transition-all duration-300 origin-top ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                            }`}
                    >
                        <h4 className="font-semibold text-gray-700 mb-2">Notifications</h4>
                        <p className="py-4 text-sm">Following pets are sad due to being unadopted for a long time:</p>

                        <ul className="text-sm text-gray-600 space-y-2">
                            {allnotifications.length > 0 ? (
                                allnotifications.map((data, index) => (
                                    <li key={index} className="py-4 bg-blue-300 px-3 py-2 rounded shadow text-blue-800">
                                        <h1 className="text-xl">🐾 {data.name}</h1>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500">No new notifications</li>
                            )}
                        </ul>
                    </div>
                </div>

            </div>


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
