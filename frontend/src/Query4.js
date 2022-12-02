import React from 'react';
import './App.css'
import Data4 from './components/Data4';

import Form1 from './components/Selectors.jsx';

import { SChartType, SActiveSchoolZoneFlag, SAtIntersection, SCrashDeathCount, SConstructionZoneFlag, SStopSignFlag, SYieldSignFlag, STrafficControlType, SDayOfWeek, SCrashInjuryCount, SCrashTime, SCrashDate } from './components/QuerySelectors.jsx';

class Query4Manager extends React.Component {
	constructor() {
		super();
		this.state = {
			firstLoad: true,
			chartType: "Line",
			filters: {}
		}
	}
	
	render() {
		var ins = "Click the Load Chart button to get started!";
		
		if(!this.state.firstLoad) {
			var a = this.state.chartType;
			var b = this.state.filters;
			
			ins = ( <Data4 chartType={a} filters={b} /> );
		}
		
		return (
			<div className="queryContainer">
				<div className="chartContainer">
					{ins}
				</div>
				<div className="optionContainer">
					<h3>Options</h3>
					<SChartType handleChange={(value) => { this.state.chartType = value }} />
					<h3>Filters</h3>
					<SActiveSchoolZoneFlag handleChange={(value) => { this.state.filters.aszf = value }} />
					<SAtIntersection handleChange={(value) => { this.state.filters.ai = value }} />
					<SCrashDeathCount handleChange={(value) => { this.state.filters.cdc = value }} />
					<SConstructionZoneFlag handleChange={(value) => { this.state.filters.czf = value }} /> 
					<SStopSignFlag handleChange={(value) => { this.state.filters.ssf = value }} />
					<SYieldSignFlag handleChange={(value) => { this.state.filters.ysf = value }} /> 
					<STrafficControlType handleChange={(value) => { this.state.filters.ttc = value }} /> 
					<SDayOfWeek handleChange={(value) => { this.state.filters.dow = value }} />
					<SCrashInjuryCount handleChange={(value) => { this.state.filters.ctic = value }} />
					<SCrashTime handleChange={(value) => { this.state.filters.ct = value }} /> 
					<SCrashDate handleChange={(value) => { this.state.filters.cd = value }} /> 
					<button onClick={ () => {
						this.setState({firstLoad: false});
						this.render();
						}}>
						Load Chart
					</button>
				</div>
			</div>
		);
	}
}


const Query4 = () => {
  return (
	<div className="bodyContainer">
		<h1>Query 4 - Relating Crash Injuries and Deaths With Time of Day</h1>
		<Query4Manager />
	</div>
  );
}

export default Query4;