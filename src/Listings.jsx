import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Listings() {
	const location = useLocation();
	const navigate = useNavigate();
	let initialMessage = location.state?.message || null;
	const [message, setMessage] = useState(initialMessage);
	const [allListings, setAllListings] = useState([]);

	//to remove the alert when the page is refreshed
	useEffect(() => {
		if (message) {
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [message, navigate, location.pathname]);

	// Fetch all listings on component mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:8080/listings");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const result = await response.json();
				setAllListings(result);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<div className="container">
				{message && (
					<div className="alert alert-success alert-dismissible fade show col-6 offset-3">
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
					{allListings.map((listing, index) => (
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
					))}
				</div>
			</div>
		</>
	);
}
