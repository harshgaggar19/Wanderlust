import React from "react";
import { useEffect, useState } from "react";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useBootstrapValidation from "./utils/useBootstrapValidation";

export default function Edit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const token = localStorage.getItem("token");
	const [listing, setListing] = useState({});
	let [newFormData, setNewFormData] = useState({
		title: "",
		description: "",
		image: {
			url: "",
		},
		price: "",
		location: "",
		country: "",
	});

	useBootstrapValidation();

	useEffect(() => {
		let fetchListings = async () => {
			try {
				let response = await fetch(
					`https://wanderlust-backend-harsh.onrender.com/listings/${id}`
				);
				let result = await response.json();
				setListing(result);
				setNewFormData({
					title: result.title || "",
					description: result.description || "",
					image: {
						url: result.image.url || "",
					},
					price: result.price || "",
					location: result.location || "",
					country: result.country || "",
				});
				console.log(result);
			} catch (err) {
				console.error(err);
			}
		};
		fetchListings();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("updating form data");
			let response = await fetch(
				`https://wanderlust-backend-harsh.onrender.com/listings/${id}/edit`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify(newFormData),
				}
			);

			console.log("Response status:", response.status);
			const responseData = await response.json();
			console.log("Response data:", responseData);

			if (response.ok) {
				console.log("form data updated");
				navigate(`/listings/${id}`, {
					state: { message: responseData.success[0] },
				});
			}
			else{
				const errorData = await response.json();
				throw new Error(errorData.message);
			} 
		} catch (err) {
			navigate("/error", { state: { errorMessage: err.message } });
		}
	};

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setNewFormData({
			...newFormData,
			[name]: value,
		});
	};

	return (
		<div className="container">
			<div className="row mt-3">
				<div className="col-8 offset-2">
					<h1>Edit Your listing</h1>
					<form onSubmit={handleSubmit} className="needs-validation" noValidate>
						<div className="mb-3">
							<label htmlFor="title" className="form-label m-0">
								Title:
							</label>
							<input
								type="text"
								name="title"
								placeholder="enter title"
								value={newFormData.title}
								onChange={handleOnChange}
								className="form-control"
								required
							/>
							<div className="invalid-feedback">Please enter a valid Title</div>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label m-0">
								Description:
							</label>
							<textarea
								name="description"
								placeholder="enter description"
								value={newFormData.description}
								onChange={handleOnChange}
								cols="30"
								className="form-control"
								required
							></textarea>
							<div className="invalid-feedback">Enter a valid description</div>
						</div>
						<div className="mb-3">
							<label htmlFor="image" className="form-label m-0">
								Image:
							</label>
							<input
								type="text"
								name="image"
								placeholder="enter image"
								value={newFormData.image.url}
								onChange={handleOnChange}
								className="form-control"
								required
							/>
							<div className="invalid-feedback">
								Please enter a valid link address
							</div>
						</div>
						<div className="row">
							<div className="mb-3 col-4">
								<label htmlFor="price" className="form-label m-0">
									Price:
								</label>
								<input
									name="price"
									placeholder="enter price"
									type="number"
									value={newFormData.price}
									onChange={handleOnChange}
									className="form-control"
									required
								/>
								<div className="invalid-feedback">Price should be valid</div>
							</div>
							<div className="mb-3 col-8">
								<label htmlFor="country" className="form-label m-0">
									Country:
								</label>
								<input
									type="text"
									name="country"
									placeholder="enter country"
									value={newFormData.country}
									onChange={handleOnChange}
									className="form-control"
									required
								/>
								<div className="invalid-feedback">Country should be valid</div>
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="location" className="form-label m-0">
								Location:
							</label>
							<input
								type="text"
								name="location"
								placeholder="enter location"
								value={newFormData.location}
								onChange={handleOnChange}
								className="form-control"
								required
							/>
							<div className="invalid-feedback">Location should be valid</div>
						</div>
						<button type="submit" className="btn btn-dark edit-btn">
							Edit
						</button>
						<br />
						<br />
					</form>
				</div>
			</div>
		</div>
	);
}
