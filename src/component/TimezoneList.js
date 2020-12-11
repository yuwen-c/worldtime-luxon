import React from 'react';
import Timezone from './Timezone';
import TimezoneNow from './TimezoneNow';

const TimezoneList = ({now, timezoneStrList, onSubButton}) => {
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
                        onSubButton={onSubButton}
                        />
                    )
                })
            }
        </div>
    )
}


export default TimezoneList;