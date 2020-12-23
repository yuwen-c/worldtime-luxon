import React from 'react';
import Option from './Option';
import PlusButton from './PlusButton';

const Searchbox = ({onInputChange, completeCity, errorMes, searchboxValue, onPlusButton, onSelectTz}) => {
    return (
        <div className="measure pa4 black-80 ">
            <label  className="f4 b db">What time is it in</label><br/>
            <div className="flex">
                {/* <div> */}
                <div className="mw-6 w-60 relative">
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
                    ></input>
                    {
                    completeCity.length !== 0 ?
                        <div id='cityDatalist' className="mw-6 w-100 absolute">
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
                {/* </div> */}

                <PlusButton
                onPlusButton={onPlusButton}
                />
            </div>
            <br/>
            <small id="name-desc" 
            className="f5 black-60 db mb2">{errorMes}</small>

            
            {/* {
            completeCity.length !== 0 ?
                <div id='cityDatalist' >
                    {completeCity.map((item, index) => {
                        return(
                            <Option 
                                key={item}
                                item={item[item.length-1]}
                            />                         
                        )  
                    })}
                </div>
            :
            null
            } */}
           
            {/* {
                completeCity.length !== 0?
                // show timezones in the autocomplete component 
                completeCity.map((item, index) => {
                    return <Option 
                    key={item}
                    value={item[item.length-1]}/>
                })

                : 
                null

            }*/}
            
        </div>
    )
}

export default Searchbox;