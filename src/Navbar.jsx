import React from "react";
import "./css/Navbar.css"

export default function Navbar() {
	return (
		<div>
			<nav className="navbar navbar-expand-md bg-body-light border-bottom ">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<i className="fa-regular fa-compass"></i>
					</a>WanderLust
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<a className="nav-link " href="/">
								Home
							</a>
							<a className="nav-link" href="/listings">
								All listings
							</a>
							<a className="nav-link" href="/listings/new">
								Add New Listing
							</a>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
