import React from 'react';
import './App.css'
import { Route } from "react-router-dom"
import TestPerson from './component/testPerson';

const Query1 = () => {
	return (
		<div className="bodyContainer">
			<h1>Query 1 - Correlating Contributing Factors and Collisions</h1>
			<div className="queryContainer">
			<TestPerson />
			</div>
		</div>
	);
}

export default Query1;