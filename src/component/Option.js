import React from 'react'


const Option = ({item, onSelectTz, onClickTz}) => {
    return(
        <div className="bg-washed-green">
            <div 
            className="w-100 bb pv2 pl2 dim b--black-50"
            onClick={onSelectTz}
            id={item}
            >{item}</div>            
        </div>

    )
}

export default Option;

