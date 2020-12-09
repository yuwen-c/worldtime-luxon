import React from 'react';

const Button = ({onButtonClick}) => {
    return(
        <div className="w-10 ml3">
            {/* <a
            type="submit"
            value="+"
            className="f6 grow no-underline br-pill ph3 pv2 dib white bg-blue"
            ></a> */}
            <div>
            <svg className="glow"
            fill='none' stroke='#555555' stroke-width='10' stroke-dashoffset='194' stroke-dasharray='0' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'
            onClick={onButtonClick} >
                <circle cx="50" cy="50" r="40"/> 
                <line x1="35" y1="50" x2="65" y2="50" /> 
                <line x1="50" y1="35" x2="50" y2="65" />
            </svg>
            </div>
        </div>
    )
}

export default Button;

