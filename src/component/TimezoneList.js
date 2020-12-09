import React from 'react';
import TimezoneNow from './TimezoneNow';

const TimezoneList = ({now}) => {
    return(
        <div>
            <TimezoneNow
            now={now}
            />
        </div>
    )
}


export default TimezoneList;