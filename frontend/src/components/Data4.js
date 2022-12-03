//Set data values for Query 4
import React from "react";
import axios from "axios";
import Chart4 from "./Chart4.js"

class Data4 extends React.Component {

  constructor(props) {
    super();
	
	var attr = "";
	var op = "";
	var val = "";
	
	for(let p in props.filters) {
		if(props.filters[p] == "" || props.filters[p] == "DNF" || props.filters[p] == "-1" || props.filters[p] == "-1 (Don't Filter)" || (p.length >= 2 && p.slice(-2) == "op") || p == "chartType" || p == "firstLoad")
		{
			continue;
		}
		
		var localval = props.filters[p];
		var localattr = p;
		var localop = null;
		
		if(props.filters[localattr + "op"] != undefined) {
			localop = props.filters[localattr + "op"];
		}
		else {
			if(localattr == "ct1" || localattr == "cd1") {
				localop = ">=";
			}
			else if(localattr == "ct2" || localattr == "cd2") {
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
	
    this.state = {
      data: undefined,
	  chartType: props.chartType,
	  attrFilters: attr,
	  opFilters: op,
	  valFilters: val
    }
  }

  componentDidMount() {
	var a = this.state.attrFilters;
	var b = this.state.opFilters;
	var c = this.state.valFilters;
    axios.get('http://localhost:5000/getQuery4', {params: {attr: a, op: b, val: c}})
      .then((response) => {
        //console.log(response.data.rows); //Debug information
        if(response.data.rows === undefined)
		{
			this.componentDidMount()
			return;
		}
		this.setState({
            data: response.data.rows
        });
		this.render();
      });
  }
  
  render() {
	var ret = this.state.data;

	if(ret === undefined) {
		return ( <p>Loading chart; please wait...</p> );
	}

	var ct = this.state.chartType;

    return (
		<Chart4 data4={ret} inType={ct} />
    );
  }
}

export default Data4;