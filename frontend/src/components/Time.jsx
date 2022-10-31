import React from 'react';
import 'antd/dist/antd.css'
import { TimePicker } from 'antd';
import { useState } from 'react';
import item from 'antd/lib/list/Item';
import moment from 'moment';

const {RangePicker} = TimePicker;

function Time(){

    const[times,setTimes] = useState([]);
    console.log(times);



    return(
        <div style ={{margin:20}}>
            <RangePicker 

            onChange={(value) =>{
                setTimes(value.map(item =>{
                    return moment(item).format('HH:mm:ss');
                }))
            }}
            />
        </div>
    );
}

export default Time;