import React from 'react';
import './App.css'
import Date from './components/Date'
import Time from './components/Time';

const Query4 = () => {
  return (
	<div className="bodyContainer">
		<h1>Query 4 - Relating Crash Injuries and Deaths With Time of Day</h1>
		<div className="queryContainer">
		</div>
		<Date />

		<Time />
	</div>
  );
}

export default Query4;