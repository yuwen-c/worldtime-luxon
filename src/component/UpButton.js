import React from 'react';

const UpButton = ({onSubButton, tz}) => {
    return(
        <div className="w-10 dib fr">
            <svg 
            className="grow"
            fill='none' stroke='#555555' strokeWidth='10' strokeDashoffset='194' strokeDasharray='0' strokeLinecap='round' strokeLinejoin='round' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
                {/* <line x1="20" y1="80" x2="80" y2="80" /> */}
                {/* <line x1="50" y1="15" x2="50" y2="65" /> */}
                <polyline fill="none" points="30,30 50,15 70,30" />
            </svg>
        </div>
    )
}

export default UpButton;

