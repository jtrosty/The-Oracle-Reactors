import React from 'react';
import axios from "axios";
import './App.css'

class FAQManager extends React.Component {
	constructor() {
		super();
		this.state = {
			load: false,
			ins: "A: Click the Count Tuples button to see how many tuples are in the database: "
		}
	}
	
	componentDidUpdate()
	{
		if(this.state.load === false) return;

		this.setState({load: false});
		this.setState({ins: "A: Querying... "});
		
		axios.get('http://localhost:5000/getTupleCount')
		.then((response) => {
			console.log(response.data.data); //Debug information
			if(response.data.data === undefined)
			{
				this.setState({load: true});
				this.componentDidUpdate()
				return;
			}
			this.setState({
				ins: "A: There are " + response.data.data + " tuples in the database. Click the Count Tuples button to update the count: "
			});
		});
	}
	
	render() {
		return (
			<div className="optionContainer">
				{this.state.ins}
				<button onClick={ () => {
					this.setState({load: true});
					this.forceUpdate();
					}}>
					Count Tuples
				</button>
			</div>
		);
	}
}

const FAQ = () => {
  return (
	<div className="bodyContainer">
		<h1>Frequently Asked Questions</h1>
		<div className="queryContainer">
			<p>Q: How do I use this application?</p>
			<p>A: One can navigate to a query page, scroll down, and hit the Load Chart button to load the default query. Then, you can use the filters and options to customize the chart. Don't forget to reload the chart after making changes!</p>
			<p>Q: How many tuples are in the database?</p>
			<FAQManager />
			<p>Q: Where did this data come from?</p>
			<p>A: The data was sourced from the Texas Crash Report Information System accessible via <a href="https://cris.dot.state.tx.us/" target="_blank">their site.</a></p>
			<p>Q: Who are the authors?</p>
			<p>A: Dylan Tosh, Jonathan Trost, Connor Wojtak, and Parth Yagnik.</p>
		</div>
	</div>
  );
}

export default FAQ;