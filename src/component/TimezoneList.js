import React from 'react';
import Timezone from './Timezone';
import TimezoneNow from './TimezoneNow';

const TimezoneList = ({now, timezoneStrList}) => {
    return(
        <div>
            <TimezoneNow
            now={now}
            />
            {
                timezoneStrList.map((item, index) => {
                    return(
                        <Timezone
                        key={item}
                        tz={item}
                        />
                    )
                })
            }
        </div>
    )
}


export default TimezoneList;