import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function index() {
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
		<div>
			<button><Link to={"/listings/new"}>New listing</Link></button>
			<ul>
				{allListings.map((listing) => (
					<li key={listing._id}>
						<Link to={`/listings/${listing._id}`}>
							{listing.title}
						</Link>
					</li>
				))}
			</ul>

		</div>
	);
}
