import React from 'react';
import Dropdown from './Form/Dropdown';


const FilterBar = ({ selected, onChange }) => {
    const personalityOptions = [
        { label: 'All', value: '' },
        { label: 'Friendly', value: 'Friendly' },
        { label: 'Playful', value: 'Playful' },
        { label: 'Shy', value: 'Shy' },
        { label: 'Aggressive', value: 'Aggressive' },
        { label: 'Calm', value: 'Calm' },
        { label: 'Energetic', value: 'Energetic' },
        { label: 'Loyal', value: 'Loyal' }
    ];

    return (
        <div className="w-full md:w-1/3">
            <Dropdown
                label="Filter by Personality"
                name="personality"
                options={personalityOptions}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default FilterBar;
