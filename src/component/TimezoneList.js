import React from 'react';
import Timezone from './Timezone';
import { Droppable } from 'react-beautiful-dnd';

const TimezoneList = ({now, timezoneStrList, onSubButton, onUpButton, local}) => {
    return(
        <Droppable droppableId="droppableId">
        {(provided, snapshot) => {
            return(
                <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
            {
                timezoneStrList.map((item, index) => {
                    return(
                        <Timezone
                        key={item}
                        tz={item}
                        onSubButton={onSubButton}
                        onUpButton={onUpButton}
                        index={index}
                        local={local}
                        />
                    )
                })
            }
        </div>
            )
        }}
        
        </Droppable>
    )
}


export default TimezoneList;