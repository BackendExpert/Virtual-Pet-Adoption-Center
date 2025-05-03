// src/pages/HomePage.js
import React from 'react';

import '../styles/global.css';
import AddPetForm from '../components/AddPetForm';
import PetList from '../components/PetList';

const HomePage = () => {

  return (
    <div className="container">
      <h1 className="title">Virtual Pet Adoption Center</h1>

      <div className="">
        <AddPetForm />        
      </div>
      <div className=''>
        <PetList />
      </div>




    </div>
  );
};

export default HomePage;
