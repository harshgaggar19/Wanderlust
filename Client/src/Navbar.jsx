import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import { useNavigate } from "react-router-dom";
import Search from "./components/Search";

export default function Navbar() {
	let navigate = useNavigate();

	const [authorized, setAuthorized] = useState(false);

	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token) {
			setAuthorized(true);
		} 
	}, [token]);

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setAuthorized(false);
		navigate("/listings")
	}


	return (
		<div>
			<nav className="navbar navbar-expand-md bg-body-light border-bottom ">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<i className="fa-regular fa-compass"></i>
					</a>
					WanderLust
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse " id="navbarNavAltMarkup">
						<div className="navbar-nav d-flex w-100  justify-content-between align-items-center">
							<div className="d-flex">
								<a className="nav-link " href="/listings">
									Home
								</a>
								<a className="nav-link" href="/listings">
									All listings
								</a>
							</div>
							{/* <Search/> */}
							<div className="d-flex">
								<a className="nav-link" href="/listings/new">
									Add New Listing
								</a>
								{!authorized ? (
									<div className="d-flex ">
										<a className="nav-link " href="/users/login">
											Login
										</a>

										<a className="nav-link" href="/users/signup">
											Sign up
										</a>
									</div>
								) : (
									<div>
										<a
											className="nav-link"
											href="/users/logout"
											onClick={handleLogout}
										>
											Logout
										</a>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
