import React from 'react';
import './App.css'
import Data4 from './components/Data4';

import { SChartType, SActiveSchoolZoneFlag, SAtIntersection, SCrashDeathCount, SConstructionZoneFlag, SStopSignFlag, SYieldSignFlag, STrafficControlType, SDayOfWeek, SCrashInjuryCount, SCrashTime, SCrashDate, SUnitDeathCount, SVehicleModelName, SVehicleMake, SUnitNotInjuredCount, SUnitTotalInjuredCount, SVehicleModelYear, SContributingFactor1, SContributingFactor2, SContributingFactor3, SCommercialVehicleType, SUnitDescription, SCitation, SDied, SAge, SEthnicity, SGender, SNotInjured } from './components/QuerySelectors.jsx';

class Query4Manager extends React.Component {
	constructor() {
		super();
		this.state = {
			firstLoad: true,
			chartType: "Line",
		}
	}
	
	render() {
		var ins = "Click the Load Chart button to get started!";
		
		if(!this.state.firstLoad) {
			var a = this.state.chartType;
			var b = this.state;
			
			ins = ( <Data4 chartType={a} filters={b} /> );
		}
		
		return (
			<div className="queryContainer">
				<div className="chartContainer">
					{ins}
				</div>
				<div className="optionContainer">
					<h3>Options</h3>
					<SChartType handleChange={(value) => { this.setState({chartType: value }) }} />
					<h3>Filters</h3>
					<SActiveSchoolZoneFlag handleChange={(value) => { this.setState({aszf: value}) }} />
					<SAtIntersection handleChange={(value) => { this.setState({ai: value}) }} />
					<SCrashDeathCount handleChange={(value) => { this.setState({cdc: value.target.value}) }} handleOpChange={(value) => { this.setState({cdcop: value}) }} />
					<SConstructionZoneFlag handleChange={(value) => { this.setState({czf: value}) }} /> 
					<SStopSignFlag handleChange={(value) => { this.setState({ssf: value}) }} />
					<SYieldSignFlag handleChange={(value) => { this.setState({ysf: value}) }} /> 
					<STrafficControlType handleChange={(value) => { this.setState({tct: value}) }} /> 
					<SDayOfWeek handleChange={(value) => { this.setState({dow: value}) }} />
					<SCrashInjuryCount handleChange={(value) => { this.setState({ctic: value.target.value}) }} handleOpChange={(value) => { this.setState({cticop: value}) }} />
					<SCrashTime handleChange1={(value) => { this.setState({ct1: value}) }} handleChange2={(value) => { this.setState({ct2: value}) }} /> 
					<SCrashDate handleChange1={(value) => { this.setState({cd1: value}) }} handleChange2={(value) => { this.setState({cd2: value}) }} /> 
					<SUnitDeathCount handleChange={(value) => { this.setState({udc: value.target.value}) }} handleOpChange={(value) => { this.setState({udcop: value}) }} /> 
					<SVehicleModelName handleChange={(value) => { this.setState({vmn: value}) }} /> 
					<SVehicleMake handleChange={(value) => { this.setState({vm: value}) }} /> 
					<SUnitNotInjuredCount handleChange={(value) => { this.setState({unic: value.target.value}) }} handleOpChange={(value) => { this.setState({udicop: value}) }} /> 
					<SUnitTotalInjuredCount handleChange={(value) => { this.setState({utic: value.target.value}) }} handleOpChange={(value) => { this.setState({uticop: value}) }} /> 
					<SVehicleModelYear handleChange={(value) => { this.setState({vmy: value}) }} /> 
					<SContributingFactor1 handleChange={(value) => { this.setState({cf1: value}) }} /> 
					<SContributingFactor2 handleChange={(value) => { this.setState({cf2: value}) }} /> 
					<SContributingFactor3 handleChange={(value) => { this.setState({cf3: value}) }} /> 
					<SCommercialVehicleType handleChange={(value) => { this.setState({cvt: value}) }} /> 
					<SUnitDescription handleChange={(value) => { this.setState({ud: value}) }} /> 
					<SCitation handleChange={(value) => { this.setState({c: value}) }} /> 
					<SDied handleChange={(value) => { this.setState({d: value}) }} /> 
					<SAge handleChange={(value) => { this.setState({a: value.target.value}) }} handleOpChange={(value) => { this.setState({aop: value}) }} /> 
					<SEthnicity handleChange={(value) => { this.setState({e: value}) }} /> 
					<SGender handleChange={(value) => { this.setState({g: value}) }} /> 
					<SNotInjured handleChange={(value) => { this.setState({ni: value}) }} /> 
					
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