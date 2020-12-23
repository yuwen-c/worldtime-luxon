import React from 'react'


const Option = ({value}) => {
    console.log("option", value)
    return(
        <option value={value}></option>
    )
}

export default Option;

