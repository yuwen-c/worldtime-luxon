import React from 'react';
import Option from './Option';
import PlusButton from './PlusButton';

const Searchbox = ({onInputChange, completeCity, errorMes, searchboxValue, onPlusButton, onSelectTz, onInputBlur}) => {
    return (
        <div className="measure pa4 black-80 ">
            <label  className="f4 b db">What time is it in</label><br/>
            <div className="flex">
                    <div className="relative w-80"
                     >
                        <input 
                            autoComplete="off"
                            onChange={onInputChange}
                            id="city" 
                            list="cityDatalist" 
                            className="input-reset ba b--black-30 pa2 db w-100" 
                            type="text" 
                            aria-describedby="name-desc" 
                            placeholder="enter city name"
                            value={searchboxValue}
                            onBlur={onInputBlur}
                        ></input>
                        {
                        completeCity.length !== 0 ?
                            <div id='cityDatalist' className="absolute bl br  w-100 shadow-2 b--black-50">
                                {completeCity.map((item, index) => {
                                    return(
                                        <Option 
                                            key={item}
                                            item={item[item.length-1]}
                                            onSelectTz={onSelectTz}
                                        />                         
                                    )  
                                })}
                            </div>
                        :
                        null
                        }
                    </div>

                <PlusButton
                onPlusButton={onPlusButton}
                />
            </div>
            <br/>
            <small id="name-desc" 
            className="f5 black-60 db mb2">{errorMes}</small>          
        </div>
    )
}

export default Searchbox;