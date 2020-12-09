import React from 'react';

const Button = ({onButtonClick}) => {
    return(
        <div className="ph3 ">
            <input 
            type="submit"
            value="add"
            onClick={onButtonClick}
            className="f6 grow no-underline br-pill ba bw2 ph3 pv2 dib dark-blue" 
            />
        </div>
    )
}

export default Button;