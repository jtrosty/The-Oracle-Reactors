//Set data values for Query 2
import React from "react";
import axios from "axios";
import Chart2 from "./Chart2.js"

class Data2 extends React.Component {

  constructor(props) {
    super();
	
    this.state = {
      data: undefined
    }
  }

  componentDidMount() {
	var a = this.props.attrFilters;
	var b = this.props.opFilters;
	var c = this.props.valFilters;
    axios.get('http://localhost:5000/getQuery2', {params: {attr: a, op: b, val: c}})
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
      });
  }
  
  componentDidUpdate(prevProps) {
	if(prevProps.attrFilters !== this.props.attrFilters || prevProps.opFilters !== this.props.opFilters || prevProps.valFilters !== this.props.valFilters) {
		this.setState({data: undefined})
		var a = this.props.attrFilters;
		var b = this.props.opFilters;
		var c = this.props.valFilters;
		axios.get('http://localhost:5000/getQuery2', {params: {attr: a, op: b, val: c}})
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
		  });
	}
  }
  
  render() {
	var ret = this.state.data;

	if(ret === undefined) {
		return ( <p>Loading chart; please wait...</p> );
	}

	var ct = this.props.chartType;

	console.log(this.props);

    return (
		<Chart2 data2={ret} inType={ct} key={this.props.attrFilters} key2={this.props.opFilters} key3={this.props.valFilters} key4={this.props.chartType} />
    );
  }
}

export default Data2;