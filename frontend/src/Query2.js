import React from 'react';
import './App.css'
import Data2 from './components/Data2'

import { SChartType, SActiveSchoolZoneFlag, SAtIntersection, SCrashDeathCount, SConstructionZoneFlag, SStopSignFlag, SYieldSignFlag, STrafficControlType, SDayOfWeek, SCrashInjuryCount, SCrashTime, SCrashDate, SUnitDeathCount, SVehicleModelName, SVehicleMake, SUnitNotInjuredCount, SUnitTotalInjuredCount, SVehicleModelYear, SContributingFactor1, SContributingFactor2, SContributingFactor3, SCommercialVehicleType, SUnitDescription, SCitation, SDied, SAge, SEthnicity, SGender, SNotInjured } from './components/QuerySelectors.jsx';

class Query2Manager extends React.Component {
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
		
		this.setState({ins: <Data2 chartType={this.state.chartType} attrFilters={attr} opFilters={op} valFilters={val} /> })
	}
	
	render() {
		return (
			<div>
				<div className="chartContainer">
					{this.state.ins}
				</div>
				<div className="optionContainer">
					<h3>Options</h3>
					<SChartType handleChange={(value) => { this.setState({chartType: value }) }} />
					<h3>Filters</h3>
					<SCrashDate handleChange1={(value) => { this.setState({cd1: `to_date(\'${value}\', \'YYYY-DD-MM\')`}) }} handleChange2={(value) => { this.setState({cd2: `to_date(\'${value}\', \'YYYY-DD-MM\')`}) }} /> 
					<SActiveSchoolZoneFlag handleChange={(value) => { this.setState({aszf: value}) }} />
					<SAtIntersection handleChange={(value) => { this.setState({ai: value}) }} />
					<SConstructionZoneFlag handleChange={(value) => { this.setState({czf: value}) }} /> 
					<SStopSignFlag handleChange={(value) => { this.setState({ssf: value}) }} />
					<SYieldSignFlag handleChange={(value) => { this.setState({ysf: value}) }} /> 
					<STrafficControlType handleChange={(value) => { this.setState({tct: value}) }} /> 
					<SDayOfWeek handleChange={(value) => { this.setState({dow: value}) }} />
					<SVehicleMake handleChange={(value) => { this.setState({vm: value}) }} /> 
					<SVehicleModelYear handleChange={(value) => { this.setState({vmy: value}) }} /> 
					<SContributingFactor1 handleChange={(value) => { this.setState({cf1: value}) }} /> 
					<SContributingFactor2 handleChange={(value) => { this.setState({cf2: value}) }} /> 
					<SContributingFactor3 handleChange={(value) => { this.setState({cf3: value}) }} /> 
					<SCommercialVehicleType handleChange={(value) => { this.setState({cvt: value}) }} /> 
					
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

					//<SVehicleModelName handleChange={(value) => { this.setState({vmn: value}) }} /> 
					//<SUnitNotInjuredCount handleChange={(value) => { this.setState({unic: value.target.value}) }} handleOpChange={(value) => { this.setState({udicop: value}) }} /> 
					//<SUnitTotalInjuredCount handleChange={(value) => { this.setState({utic: value.target.value}) }} handleOpChange={(value) => { this.setState({uticop: value}) }} /> 
					//<SCrashTime handleChange1={(value) => { this.setState({ct1: `to_timestamp(\'01-OCT-22 ${value}\', \'DD-MON-YY HH24::MI::SS\')`}) }} handleChange2={(value) => { this.setState({ct2: `to_timestamp(\'01-OCT-22 ${value}\', \'DD-MON-YY HH24::MI::SS\')`}) }} /> 
					//<SCrashDeathCount handleChange={(value) => { this.setState({cdc: value.target.value}) }} handleOpChange={(value) => { this.setState({cdcop: value}) }} />
					//<SCrashInjuryCount handleChange={(value) => { this.setState({ctic: value.target.value}) }} handleOpChange={(value) => { this.setState({cticop: value}) }} />
					//<SUnitDeathCount handleChange={(value) => { this.setState({udc: value.target.value}) }} handleOpChange={(value) => { this.setState({udcop: value}) }} /> 
					//<SUnitDescription handleChange={(value) => { this.setState({ud: value}) }} /> 
const Query2 = () => {
  return (
	<div className="bodyContainer">
		<h1>Query 2 - Correlating Vehicle Makes and Crash Fatalities</h1>
		<div className="queryContainer">
			<h3>Description</h3>
			<p> The purpose of this query is to analyze how crash fatalities in Texas have varied over the last ten years for the top 5 vehicle makes with the highest average number of deaths.</p>
			<h3>Chart</h3>
			<Query2Manager />
		</div>
	</div>
  );
}
export default Query2;