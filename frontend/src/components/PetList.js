import React, { useEffect, useState } from 'react';
import { getallpets } from '../services/api';
import { formatDate } from '../utils/helpers';

const PetList = () => {
    const [petdata, setpetdata] = useState([]);

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
    return (
        <div className="pet-list-container">
            {petdata.length > 0 ? (
                petdata.map((data, index) => (
                    <div key={index} className="pet-card">
                        <p><strong>Name:</strong> {data.name}</p>
                        <p><strong>Species:</strong> {data.species}</p>
                        <p><strong>Age:</strong> {data.age}</p>
                        <p><strong>Personality:</strong> {data.personality}</p>

                        {
                            data.adopted === false ?
                                <p style={{ color: 'red' }}>Not Adopt</p>
                                :
                                <p style={{ color: 'green' }}>Adopt</p>
                        }

                        {
                            data.adopted === true ?
                                <p><strong>Adopt At:</strong> <span style={{ color: 'blue'}}>{formatDate(data.adoption_date)}</span></p>
                                :
                                <p></p>
                        }



                        <button className="edit-button">Edit</button>

                        {
                            data.adopted === false ?
                                <button className="edit-button" style={{ marginLeft: 4 }}>Adopt</button>
                                :
                                <p></p>
                        }

                    </div>
                ))
            ) : (
                <p>No pets available</p>
            )}
        </div>



    );
};

export default PetList;
