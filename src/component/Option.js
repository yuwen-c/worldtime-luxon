import React from 'react'


const Option = ({item, onSelectTz}) => {
    return(
        <input 
        className="pa2 w-90"
        defaultValue={item}
        onClick={()=>{onSelectTz(item)}}
        ></input>
    )
}

export default Option;

