import '../App.css';
import React from 'react';
import { Link, Outlet } from "react-router-dom";

const SidePageLinkSelection = () => {
	return (
		<>
			<div className="sideNavBar">
				<h1>Navigation</h1>
				<Link to="/">Home</Link>
				<Link to="/Query1.js">Query 1 Analyzer</Link>
				<Link to="/Query2.js">Query 2 Analyzer</Link>
				<Link to="/Query3.js">Query 3 Analyzer</Link>
				<Link to="/Query4.js">Query 4 Analyzer</Link>
				<Link to="/Query5.js">Query 5 Analyzer</Link>
				<Link to="/FAQ.js">FAQ</Link>
			</div>
			<Outlet />
		</>
	);
}

export default SidePageLinkSelection;
