import React from 'react'

const DefultBtn = ({ type, text="click Me", onClick}) => {
  return (
    <button
        type={type}        
        className='add-button'
    >
        {text}
    </button>
  )
}

export default DefultBtn