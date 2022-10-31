import React from 'react';
import './App.css'
import Date from './components/Date'
import Time from './components/Time';

const Query2 = () => {
  return (
	<div className="bodyContainer">
		<h1>Query 2 - Correlating Vehicle Makes and Crash Fatalities</h1>
		<div className="queryContainer">
		</div>
		<Date />

		<Time />
	</div>

	
  );
}

export default Query2;