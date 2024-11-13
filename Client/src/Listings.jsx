import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,useOutletContext } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Filter from "./components/Filter";
import Spinner from "./components/Spinner";

export default function Listings() {
	const location = useLocation();
	const navigate = useNavigate();
	let initialMessage = location.state?.message || null;
	const [message, setMessage] = useState(initialMessage);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [filter, setFilter] = useState("");

	const [allListings, setAllListings] = useState([]);
	const handleFilterChange = (filter) => {
		// console.log(filter);
		setFilter(filter);
	};

	const token = localStorage.getItem("token");
	useEffect(() => {
		if (!token) {
			return;
		}
		try {
			const decodedToken = jwtDecode(token);
			setUser(decodedToken.userID);
		} catch (err) {
			console.log("invalid token");
		}
	}, [token]);
	//to remove the alert when the page is refreshed
	useEffect(() => {
		if (message) {
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [message, navigate, location.pathname]);

	// Fetch all listings on component mount
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			console.log(filter)
			try {
				const response = await fetch(
					`https://wanderlust-harshgaggar.onrender.com/listings?filter=${filter}`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const result = await response.json();
				setAllListings(result);
				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [filter]);

	return (
		<>
			<Filter onFilterChange={handleFilterChange} />
			<div className="">
				{message && (
					<div className="alert alert-success alert-dismissible fade show col-6 offset-3 ">
						{message}
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="alert"
							aria-label="Close"
							onClick={() => setMessage(null)}
						></button>
					</div>
				)}
			
				<div className="row row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-xs-1">
					{!loading? allListings.length > 0 ? (
						allListings.map((listing, index) => (
							<a
								href={`listings/${listing._id}`}
								className="listing-link"
								key={index}
							>
								<div className="card col listing-card">
									<img
										src={`${listing.image.url}`}
										className="card-img-top"
										alt="listing_image"
										style={{ height: "18rem" }}
									/>
									<div className="card-img-overlay"></div>
									<div className="card-body">
										<p className="card-text">
											<b>{listing.title}</b> <br />
											{listing.price.toLocaleString("en-IN", {
												maximumFractionDigits: 2,
												style: "currency",
												currency: "INR",
											})}{" "}
											/night
										</p>
									</div>
								</div>
							</a>
						))
					) : (
						<h2>No lisitngs found!</h2>
					): <Spinner/>}
				</div>
			</div>
		</>
	);
}
