import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import { useNavigate } from "react-router-dom";

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
					<a className="navbar-brand" href="/listings">
						<i className="fa-regular fa-compass"></i>
					</a>
					<span
						style={{ fontWeight: "500", fontSize: "3vh", marginRight: "5px" }}
					>
						{" "}
						<a className="navbar-brand" href="/listings">
							{" "}
							WanderLust
						</a>
					</span>
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
									Explore
								</a>
							</div>
							{/* <Search/> */}
							<div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
								<a className="nav-link" href="/listings/new">
									Add New Listing
								</a>
								{!authorized ? (
									<div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
										<a className="nav-link justify-center" href="/users/login">
											Login
										</a>

										<a className="nav-link" href="/users/signup">
											Sign up
										</a>
									</div>
								) : (
									<div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
										{/* <a className="nav-link" href="/listings/mylistings">
											My Listings
										</a> */}
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
