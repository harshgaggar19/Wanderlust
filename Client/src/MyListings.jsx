import React, { useState, useEffect } from "react";
import axios from "axios";

const MyListings = () => {
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const token = localStorage.getItem("token");

				const response = await axios.get(
					`https://wanderlust-backend-harsh.onrender.com/listings/my-listings`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

                setListings(response.data);
                console.log(listings)
			} catch (err) {
				setError(err.response?.data?.message || "An error occurred.");
			} finally {
				setLoading(false);
			}
		};

		fetchListings();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<h1>My Listings</h1>
			{listings.length === 0 ? (
				<p>No listings found.</p>
			) : (
				<ul>
					{listings.map((listing) => (
						<li key={listing._id}>
							<h2>{listing.title}</h2>
							<p>{listing.description}</p>
							<img src={listing.image.url} alt={listing.title} width="200" />
							<p>Price: ${listing.price}</p>
							<p>
								Location: {listing.location}, {listing.country}
							</p>
							<p>Category: {listing.category}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default MyListings;
