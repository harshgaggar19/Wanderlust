import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Show() {
	const { id } = useParams();

	const [listing, setListing] = useState({});

	useEffect(() => {
		let fetchListings = async () => {
			try {
				let response = await fetch(`http://localhost:8080/listings/${id}`);
				let result = await response.json();
				setListing(result);
				console.log(result);
			} catch (err) {
				console.error(err);
			}
		};
		fetchListings();
	}, []);

	if (!listing) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<h1>Listing details</h1>
			<ul>
				<li>{listing.title}</li>
				<li>{listing.description}</li>
				<li>
					{typeof listing.price !== "undefined" ? listing.price.toLocaleString("en-IN", {
						maximumFractionDigits: 2,
						style: "currency",
						currency: "INR",
					}): listing.price}
                    
				</li>
				<li>{listing.location}</li>
				<li>{listing.country}</li>
			</ul><br />
			<a href={`/listings/${listing._id}/edit`}>Edit this listing</a>
		</div>
	);
}
