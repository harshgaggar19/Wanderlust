import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Review from "./Review";
import { useLocation } from "react-router-dom";

export default function Show() {
	const navigate = useNavigate();
	const location = useLocation();
	let initialMessage = location.state?.message || null;
	const [message, setMessage] = useState(initialMessage);
	const { id } = useParams();

	const [listing, setListing] = useState({});

	useEffect(() => {
		if (message) {
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [message, navigate, location.pathname]);

	useEffect(() => {
		let fetchListings = async () => {
			try {
				let response = await fetch(`http://localhost:8080/listings/${id}`);
				let result = await response.json();
				setListing(result);
			} catch (err) {
				console.error(err);
			}
		};
		fetchListings();
	}, []);


	if (!listing) {
		navigate("/error",{state:{errorMessage:"Listing not Found"}})
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch(`http://localhost:8080/listings/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.json();
			console.log("deleted listing:", responseData);
			if (response.ok) {
				navigate("/listings",{state:{message:responseData.success[0]}});
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleReviewDelete = async (e,review_id) => {
		e.preventDefault();
		try {
			let response = await fetch(`http://localhost:8080/listings/${id}/reviews/${review_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const responseData = await response.json();
			console.log("deleted listing:", responseData);
			if (response.ok) {
				navigate(`/listings/${id}`, { state: { message: responseData[0] } });
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
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
			<div className="row mt-3">
				<div className="col-8 offset-3">
					<h1>Listing details</h1>
				</div>
				<div className="card listing-card col-6 offset-3">
					<img
						src={`${listing.image.url}`}
						className="card-img-top show-img"
						alt="listing-image"
					/>
					<div className="card-body">
						<p className="card-text mt-3">
							<b>{listing.title}</b>
							<br />
							{listing.description} <br />
							{typeof listing.price !== "undefined"
								? listing.price.toLocaleString("en-IN", {
										maximumFractionDigits: 2,
										style: "currency",
										currency: "INR",
								  })
								: listing.price}{" "}
							<br />
							{listing.location} <br />
							{listing.country} <br />
						</p>
					</div>
				</div>
				<br />
				<div className="btns mb-3">
					<a
						href={`/listings/${listing._id}/edit`}
						className="btn edit-btn btn-dark offset-3"
					>
						Edit
					</a>
					<form onSubmit={handleSubmit}>
						<button type="submit" className="btn btn-dark offset-4 ">
							Delete
						</button>
					</form>
				</div>
				<hr />
				<Review id={id } />

				<hr />
				<div className="all-reviews col-8 offset-3">
					<h4>All listings</h4>
					<div className="row">
						{listing.review.map((listing, index) => (
							<div className="card col-5 mx-3 mb-3" key={index}>
								<div className="card-body">
									<h5 className="card-title">Jane doe</h5>
									<p className="card-text">{listing.comment}</p>
									<p className="card-text">{listing.rating} stars</p>
									<form
										onClick={(e) => handleReviewDelete(e, listing._id)}
										className="mb-2"
									>
										<button className="btn btn-sm btn-dark">Delete</button>
									</form>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
