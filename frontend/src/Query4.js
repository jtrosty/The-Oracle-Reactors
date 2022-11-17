import React from 'react';
import './App.css'
import Data4 from './components/Data4';

const Query4 = () => {
  return (
	<div className="bodyContainer">
		<h1>Query 4 - Relating Crash Injuries and Deaths With Time of Day</h1>
		<div className="queryContainer">
			<div className="chartContainer">
				<Data4 />
			</div>
		</div>
	</div>
  );
}

export default Query4;