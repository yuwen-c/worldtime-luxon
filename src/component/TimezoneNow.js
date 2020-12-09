import React from 'react';
import {DateTime} from 'luxon';

const TimezoneNow = ({now}) => {

    return(
        <div>
        <h1 className="f4 bold center mw5 tc">{now.zoneName}</h1>
        <ul className="list pl0 ml0 center mw5 ba b--mid-gray br2">
            <li className="ph3 pv2 tc bb b--mid-gray">{now.toLocaleString()}</li>
            <li className="ph3 pv2 tc">{now.toLocaleString(DateTime.TIME_WITH_SECONDS)}</li>
        </ul>
    </div>
    )
}

export default TimezoneNow;





