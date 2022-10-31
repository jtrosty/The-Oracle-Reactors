import React from 'react';
import './App.css'
import Date from './components/Date'
import Time from './components/Time';

const Query3 = () => {
  return (
	<div className="bodyContainer">
		<h1>Query 3 - Relating Traffic Control Devices and Crash Injuries</h1>
		<div className="queryContainer">
		</div>
		<Date />

		<Time />
	</div>
  );
}

export default Query3;