import React from 'react';
import 'antd/dist/antd.css';
import { Select,Input } from 'antd';
import tagOptions from './field_data/Factors.jsx'
import Date from './Date'
const { Search } = Input;

// variables that hold the filters
var factor1;
function Form1(){
    return(
        <div>
            <DropdownFactor />
            <p className='label'> Enter date range</p>
			<Date className = 'label'/>
			<p>Age</p>
            <Age />
            <AgeInput />
        </div>
    );
}


const onSearch = (value) => {

    console.log(value);
}


function AgeInput(){
    return(
        <Search 
        placeholder="input search text" 
        onSearch={onSearch} 
        style={{ width: 200 }} 
        size = "large"
        />

    );
}

const handleChange1 = (value) => {
    factor1 = value;
    console.log(`selected ${factor1} `);
};

function Age(){
    return(
        <Select
        defaultValue="="
        style={{ width: 120 }}
        onChange={handleChange1}
        options={[
          {
            value: '=',
            label: '=',
          },
          {
            value: '>',
            label: '>',
          },
          {
            value: '<',
            label: '<',
          },
         
        ]}
        size = "large"
    />
    );
}

const factors = tagOptions.map(targetEntry =>{
    return targetEntry;
});

const handleChange = (value,label) => {
    
    console.log(`selected ${value}`);
  };

function DropdownFactor (){
  
  return(
    <Select
      defaultValue='Contributing Factor'
      style={{ width: 300 }}
      onChange={handleChange}
      options={factors}
    />
  );
}

export default Form1;
