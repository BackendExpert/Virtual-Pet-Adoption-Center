import React from 'react';

const DropDown = ({ label, name, value, onChange, options, required }) => {
    return (
        <div>
            <p className='input-label'>{label}</p>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={!!required}
                className='dropdown-input'
            >
                <option value="" disabled>Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropDown;
