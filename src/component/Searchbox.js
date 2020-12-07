import React from 'react';
import Option from './Option';



const Searchbox = ({changeFun, keydownFunc, completeCity, errorMes}) => {
    return (
        <div className="measure pa4 black-80 ">
            <label  className="f4 b db">What time is it in</label><br/>
            <input 
            onChange={changeFun}
            onKeyDown={keydownFunc}
            id="city" 
            list="cityDatalist" 
            className="input-reset ba b--black-30 pa2 db w-60" 
            type="text" 
            aria-describedby="name-desc" 
            placeholder="enter city name"
            ></input>
            <br/>
            <small id="name-desc" 
            className="f5 black-60 db mb2">{errorMes}</small>
            <datalist id='cityDatalist' >
            {
                // map the comparison results so every city can show in the autocomplete component 
                completeCity.map((item, index) => {
                    return <Option 
                    key={item}
                    value={item[item.length-1]}/>
                })

            }
            </datalist>
        </div>
    )
}

export default Searchbox;