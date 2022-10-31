import React from 'react';
import './App.css'
import Date from './components/Date'
import Time from './components/Time';

const Query1 = () => {
  return (
	<div className="bodyContainer">
		<h1>Query 1 - Correlating Contributing Factors and Collisions</h1>
		<div className="queryContainer">
		</div>

		<Date />

		<Time />
		
	</div>
  );
}

export default Query1;