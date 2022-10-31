import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { createBrowserRouter } from 'react-router-dom';

//const axios = require('axios');


const Test = () => {
        const [personData, setPersonData] = useState(null);
        const url = 'http://localhost:5000'
    
    const getData = () => {

        const {data} = axios.get(`${url}/getPerson`)
        .then((response) => {
             setPersonData(response.data);
            console.log(response.data);
        })
        .then((error) => {
            console.log(error);
        }) 
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
        </div>
)}

export default Test;

/*
export default () => {
    const [personData, setPersonData] = useState('');
    const url = 'http://localhost:5000'
    const data = null;

    axios.get(`${url}/getPerson`)
    .then((response) => {
        console.log(response.data);
        setPersonData(response.data);
        //helo
    })
    .then((error) => {
        console.log(error);
    }) 
    useEffect(() => {
    }, [])

    return (
    <div>
    <div></div>
    </div>
)}
*/