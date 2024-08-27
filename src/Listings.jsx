import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Listings() {
	let [allListings, setAllListings] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:8080/listings");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const result = await response.json();
				console.log("Here is the result", result);
				setAllListings(result);
			} catch (err) {
				console.error(err);
			}
			// finally {
			// 	setLoading(false);
			// }
		};
		fetchData();
	}, []);

	return (
		<div className="container">
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
	);
}
