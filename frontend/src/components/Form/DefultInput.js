import React from 'react'
import '../../styles/global.css'

const DefultInput = ({ label, type, name, value, placeholder, requried, onChange }) => {
  return (
    <div>
        <p className='input-label'>{label}</p>
        <input 
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            required={!!requried}
            onChange={onChange}
            className='input-text'
        />
    </div>
  )
}

export default DefultInput