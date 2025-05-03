import React from 'react'

const PetCard = ({ petId }) => {
  return (
    <div className='bg-white p-8 rounded-xl shadow-xl my-4'>
        {petId}
    </div>
  )
}

export default PetCard