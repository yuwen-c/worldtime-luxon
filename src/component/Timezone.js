import React from 'react';
import { DateTime } from 'luxon'
import SubButton from '../component/SubButton';

const Timezone = ({tz}) => {
    // const tzData = DateTime.local().setZone(tz);
    const tzDataStr = DateTime.local().setZone(tz).setLocale('en-us').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
    const tzDataStrHuge = DateTime.local().setZone(tz).setLocale('en-us').toLocaleString(DateTime.DATETIME_HUGE);
    const zoneName = DateTime.local().setZone(tz).zoneName;
    const subZoneName = zoneName.substring(zoneName.indexOf("/")+1);
    return(
        <div className="center br3 w-90 pv3 ph4 bg-white mt2 ">
            <div className="dib" id="zoneName">
                {subZoneName}
            </div>
            <SubButton className=""/>
            <div>
                <div className="">
                    <div className="dib w-70 tr pr2">
                        <span className="f1" id="10:14">
                            {tzDataStr.slice(-11, -6)}
                        </span>
                        <span className="f2 gray" id=":55">
                            {tzDataStr.slice(-6, -3)}
                        </span>
                    </div>
                    <div className="f4 dib" id="AM PM">
                        {tzDataStr.slice(-2)} 
                    </div>                    
                </div>
                <div className="f5 gray" id="Friday, December 11, 2020">
                    {tzDataStrHuge.substring(0, 25)}
                </div>
            </div>
        </div>
    )
}
export default Timezone;

// const Timezone = ({timezoneData}) => {
//     return (
//         <div>
//             <h1 className="f4 bold center mw5 tc">{timezoneData.timezone}</h1>
//             <ul className="list pl0 ml0 center mw5 ba b--mid-gray br2">
//                 <li className="ph3 pv2 tc bb b--mid-gray">{timezoneData.datetime.slice(0,10)}</li>
//                 <li className="ph3 pv2 tc">{timezoneData.datetime.slice(11,19)}</li>
//             </ul>
//         </div>
//     )
// }
