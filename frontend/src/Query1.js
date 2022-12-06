import React from 'react';
import './App.css'
import Data1 from './components/Data1';

import { SChartType, SActiveSchoolZoneFlag, SAtIntersection, SCrashDeathCount, SConstructionZoneFlag, SStopSignFlag, SYieldSignFlag, STrafficControlType, SDayOfWeek, SCrashInjuryCount, SCrashTime, SCrashDate, SUnitDeathCount, SVehicleModelName, SVehicleMake, SUnitNotInjuredCount, SUnitTotalInjuredCount, SVehicleModelYear, SContributingFactor1, SContributingFactor2, SContributingFactor3, SCommercialVehicleType, SUnitDescription, SCitation, SDied, SAge, SEthnicity, SGender, SNotInjured } from './components/QuerySelectors.jsx';

class Query1Manager extends React.Component {
	constructor() {
		super();
		this.state = {
			load: false,
			chartType: "Line",
			ins: "Click the Load Chart button to get started!"
		}
	}
	
	componentDidUpdate()
	{
		if(this.state.load === false) return;

		this.setState({load: false});
		this.setState({ins: "Updating..."});
		
		var attr = "";
		var op = "";
		var val = "";
		
		var props = {filters: this.state}
		
		for(let p in props.filters) {
			if(props.filters[p] === "" || props.filters[p] === "DNF" || props.filters[p] === "-1" || props.filters[p] === "-1 (Don't Filter)" || props.filters[p] === "to_timestamp('Invalid date', 'DD-MON-YY HH24::MI::SS')" || (p.length >= 2 && p.slice(-2) === "op") || p === "chartType" || p === "load" || p === "ins")
			{
				continue;
			}
			
			var localval = props.filters[p];
			var localattr = p;
			var localop = null;
			
			if(props.filters[localattr + "op"] !== undefined) {
				localop = props.filters[localattr + "op"];
			}
			else {
				if(localattr === "ct1" || localattr === "cd1") {
					localop = ">=";
				}
				else if(localattr === "ct2" || localattr === "cd2") {
					localop = "<="
				}
				else {
					localop = "=";
				}
			}
			
			attr += localattr + "|";
			op += localop + "|";
			val += localval + "|";
		}
		
		this.setState({ins: <Data1 chartType={this.state.chartType} attrFilters={attr} opFilters={op} valFilters={val} /> })
	}
	
	render() {
		return (
			<div className="queryContainer">
				<div className="chartContainer">
					{this.state.ins}
				</div>
				<div className="optionContainer">
					<h3>Options</h3>
					<SChartType handleChange={(value) => { this.setState({chartType: value }) }} />
					<h3>Filters</h3>
					
					<SCrashDate handleChange1={(value) => { this.setState({cd1: `to_date(\'${value}\', \'YYYY-DD-MM\')`}) }} handleChange2={(value) => { this.setState({cd2: `to_date(\'${value}\', \'YYYY-DD-MM\')`}) }} /> 		
					<SContributingFactor1 handleChange={(value) => { this.setState({cf1: value}) }} /> 
					<SContributingFactor2 handleChange={(value) => { this.setState({cf2: value}) }} /> 
					<SContributingFactor3 handleChange={(value) => { this.setState({cf3: value}) }} /> 
					
					
					<button onClick={ () => {
						this.setState({load: true});
						this.forceUpdate();
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
		<h1>Query 1 - Relating Crash Injuries and Deaths With Time of Day</h1>
		<h3>Description</h3>
		<p> The purpose of this query is to analyze how the percent injury and death rates resulting from vehicle accidents involving two or more people vary on average throughout a typical day.</p>
		<h3>Chart</h3>
		<Query1Manager />
	</div>
  );
}

export default Query4;