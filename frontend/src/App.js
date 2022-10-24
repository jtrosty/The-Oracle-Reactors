import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './Home.js'
import Query1 from './Query1.js'
import Query2 from './Query2.js'
import Query3 from './Query3.js'
import Query4 from './Query4.js'
import Query5 from './Query5.js'
import FAQ from './FAQ.js'
import SidePageLinkSelection from './Navigation.js'

const Main = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/" element={<SidePageLinkSelection />}>
				<Route path="Query1.js" element={<Query1 />} />
				<Route path="Query2.js" element={<Query2 />} />
				<Route path="Query3.js" element={<Query3 />} />
				<Route path="Query4.js" element={<Query4 />} />
				<Route path="Query5.js" element={<Query5 />} />
				<Route path="FAQ.js" element={<FAQ />} />
			</Route>
		</Routes>
	);
}

export default Main;
