import './App.css';
import React from 'react';
import { Link } from "react-router-dom";

class FrontPageLinkSelection extends React.Component {
	render() {
		return (
			<div className="frontPageCenter">
				<div className="frontPageCenterBlockLeft">
					<Link to="/Query1.js">Query 1 Analyzer</Link>
					<Link to="/Query2.js">Query 2 Analyzer</Link>
					<Link to="/Query3.js">Query 3 Analyzer</Link>
				</div>
				<div className="frontPageCenterBlockRight">
					<Link to="/Query4.js">Query 4 Analyzer</Link>
					<Link to="/Query5.js">Query 5 Analyzer</Link>
					<Link to="/FAQ.js">FAQ</Link>
				</div>
			</div>
		);
	}
}

const Home = () => {
	return (
		<div className="App">
			<div className="App-body">
				<header className="App-title">
					<h1>Texas Automobile Crash Trends Analyzer (TACTA)</h1>
					<h3>Welcome!</h3>
					<p>Get started on reviewing Texas vehicle accident data by visiting one of the available trend queries or by visiting the FAQ:</p>
				</header>
				<FrontPageLinkSelection />
				<header className="App-title">
					<h3>Query Descriptions</h3>
					<p>Query 1 involves correlating contributing factors and collisions.</p>
					<p>Query 2 involves correlating vehicle makes and crash fatalities.</p>
					<p>Query 3 involves correlating traffic control devices and crash injuries.</p>
					<p>Query 4 involves correlating crash injuries and deaths with time of day.</p>
					<p>Query 5 involves correlating citation rates after accidents with time.</p>
				</header>
			</div>
		</div>
	);
}

export default Home;
