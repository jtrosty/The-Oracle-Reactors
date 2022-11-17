//This is the client's page for http://localhost:3000/Query3.js
import React from 'react';
import './App.css'
import Data3 from './components/Data3';
import Chart3 from './components/Chart3';

const Query3 = () => {
  return (
	<div className="bodyContainer">
		<h1>Query 3 - Relating Traffic Control Devices and Crash Injuries</h1>
		<div className="queryContainer">
			<div className="chartContainer">
				<Data3 />
				<Chart3 />
			</div>
		</div>
	</div>
  );
}

export default Query3;