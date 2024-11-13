import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Review from "./Review";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./css/rating.css";
import "./css/map.css";
import Spinner from "./components/Spinner";

export default function Show() {
	const navigate = useNavigate();
	const location = useLocation();
	let initialMessage = location.state?.message || null;
	const [message, setMessage] = useState(initialMessage);
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);

	const { id } = useParams();

	const [listing, setListing] = useState({});

	const token = localStorage.getItem("token");
	useEffect(() => {
		if (token) {
			const decodedToken = jwtDecode(token);
			setUser(decodedToken.userID);
		}
	}, [token]);

	useEffect(() => {
		if (message) {
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [message, navigate, location.pathname]);

	useEffect(() => {

		let fetchListings = async () => {
			try {
				setLoading(true);
				let response = await fetch(
					`https://wanderlust-harshgaggar.onrender.com/listings/${id}`
				);
				let result = await response.json();
				setListing(result);
				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		};
		fetchListings();
	}, []);

	if (!listing) {
		navigate("/error", { state: { errorMessage: "Listing not Found" } });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch(
				`https://wanderlust-harshgaggar.onrender.com/listings/${id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const responseData = await response.json();
			if (response.ok) {
				navigate("/listings", { state: { message: responseData.success[0] } });
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleReviewDelete = async (e, review_id) => {
		e.preventDefault();
		try {
			let response = await fetch(
				`https://wanderlust-harshgaggar.onrender.com/listings/${id}/reviews/${review_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const responseData = await response.json();
			if (response.ok) {
				navigate(`/listings/${id}`, { state: { message: responseData[0] } });
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!listing || !listing.geometry || !listing.geometry.coordinates) return;
		mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;
		let coordinates = listing.geometry ? listing.geometry.coordinates : "";
		const map = new mapboxgl.Map({
			container: "map",
			center: coordinates,
			zoom: 9,
		});
		const marker1 = new mapboxgl.Marker({ color: "red" })
			.setLngLat(coordinates)
			.setPopup(
				new mapboxgl.Popup({ offset: 30 }).setHTML(`<h5>${listing.title}</h5><p>Exact location will be provided after booking</p>`)
			)
				.addTo(map);
			
	},[listing]);

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
			{!loading ? (
				<div className="row mt-3">
					<div className="col-8 offset-3">
						<h1>Listing details</h1>
					</div>
					<div className="card listing-card col-md-6 col-10 offset-1 offset-md-3">
						<img
							src={`${listing.image ? listing.image.url : "#"}`}
							className="card-img-top show-img"
							alt="listing-image"
						/>
						<div className="card-body">
							<p className="card-text mt-3">
								Owned by ~{" "}
								<i>{listing.owner ? listing.owner.username : "loading.."}</i>
								<br />
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

					{listing && listing.owner && user == listing.owner._id ? (
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
					) : (
						<></>
					)}

					{user ? <Review id={id} /> : <></>}

					<hr />
					<div className="all-reviews col-md-6 col-10 offset-1 offset-md-3">
						<h4>All Reviews</h4>
						<div className="row">
							{listing.review && listing.review.length ? (
								listing.review.map((listing, index) => (
									<div className="card col-5 mx-3 mb-3" key={index}>
										<div className="card-body">
											<h5 className="card-title">{listing.author.username}</h5>
											<p
												className="starability-result"
												style={{ scale: "0.7" }}
												data-rating={listing.rating}
											>
												Rated: 3 stars
											</p>
											<p className="card-text">{listing.comment}</p>
											<form
												onClick={(e) => handleReviewDelete(e, listing._id)}
												className="mb-2"
											>
												{listing.author && user == listing.author._id ? (
													<button className="btn btn-sm btn-dark">
														Delete
													</button>
												) : (
													<></>
												)}
											</form>
										</div>
									</div>
								))
							) : (
								<p>No reviews yet</p>
							)}
						</div>
					</div>
					<div className="col-md-6 col-10 offset-1 offset-md-3">
						<h3>Where you will be</h3>
						<div id="map"></div>
					</div>
				</div>
			) : (
				<Spinner />
			)}
		</div>
	);
}
