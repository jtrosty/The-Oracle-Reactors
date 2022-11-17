//Set data values for Query 4
import React from "react";
import axios from "axios";
import Chart4 from "./Chart4.js"

class Data4 extends React.Component {

  constructor() {
    super();
    this.state = {
      data: undefined
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/getQuery4')
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

    return (
		<Chart4 data4={ret} />
    );
  }
}

export default Data4;