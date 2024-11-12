import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./css/Layout.css"

const Layout = () => {
	
	return (
		<div className="layout">
			<Navbar />
			<main className="container">
				
				<Outlet/>
			</main>
			<Footer/>
		</div>
	);
};

export default Layout;
