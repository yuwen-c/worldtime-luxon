import React from 'react';

const Timezone = ({timezoneData}) => {
    return (
        <div>
            <h1 className="f4 bold center mw5 tc">{timezoneData.timezone}</h1>
            <ul className="list pl0 ml0 center mw5 ba b--mid-gray br2">
                <li className="ph3 pv2 tc bb b--mid-gray">{timezoneData.datetime.slice(0,10)}</li>
                <li className="ph3 pv2 tc">{timezoneData.datetime.slice(11,19)}</li>
            </ul>
        </div>
    )
}

export default Timezone;