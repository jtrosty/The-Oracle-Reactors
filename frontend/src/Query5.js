import React from 'react';
import './App.css'
import Date from './components/Date'
import Time from './components/Time';

const Query5 = () => {
  return (
	<div className="bodyContainer">
		<h1>Query 5 - Relating Citation Rates After Accidents and Time</h1>
		<div className="queryContainer">
		</div>
		<Date />

		<Time />
	</div>
  );
}

export default Query5;