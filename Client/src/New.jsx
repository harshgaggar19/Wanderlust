import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import useBootstrapValidation from "./utils/useBootstrapValidation";

export default function New() {
	const navigate = useNavigate();
	let [formData, setFormData] = useState({
		title: "",
		description: "",
		price: "",
		location: "",
		country: "",
		category:""
	});
	const categories = [
		{ value: "", label: "Select a Category" },
		{ value: "amazing_views", label: "Amazing Views" },
		{ value: "amazing_pools", label: "Amazing Pools" },
		{ value: "farms", label: "Farms" },
		{ value: "rooms", label: "Rooms" },
		{ value: "lakefront", label: "Lakefront" },
		{ value: "omg", label: "OMG!" },
		{ value: "beachfront", label: "Beachfront" },
		{ value: "castles", label: "Castles" },
		{ value: "treehouses", label: "Treehouses" },
		{ value: "luxe", label: "Luxe" },
		{ value: "cabins", label: "Cabins" },
		{ value: "tiny_homes", label: "Tiny Homes" },
		{ value: "luxury", label: "Luxury" },
	];

	let [imageFile, setImageFile] = useState(null);

	useBootstrapValidation();
	const token = localStorage.getItem("token");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let response = await fetch(
				"https://wanderlust-backend-harsh.onrender.com/listings/new",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify({ listing: formData }),
				}
			);

			const responseData = await response.json();

			if (response.ok) {
				if (imageFile) {
					let formDataForImage = new FormData();
					formDataForImage.append("image", imageFile);

					let imageResponse = await fetch(
						`https://wanderlust-backend-harsh.onrender.com/listings/new/${responseData.newListing._id}/upload-image`,
						{
							method: "POST",
							headers: {
								Authorization: token,
							},
							body: formDataForImage,
						}
					);

					if (!imageResponse.ok) {
						console.log(imageResponse.data);
						throw new Error("Image upload failed");
					} else {
						
						console.log(imageResponse.data);
					}
				}
			} else {
				const errorData = responseData;
				throw new Error(errorData.message);
			}
			navigate("/listings", {
				state: { message: responseData.success[0] },
			});
			console.log("hello")
		} catch (err) {
			navigate("/error", { state: { errorMessage: err.message } });
		}
	};

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFileChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	return (
		<div className="container">
			<div className="row mt-3">
				<div className="col-8 offset-2">
					<h1>Create New listing</h1>
					<form
						onSubmit={handleSubmit}
						noValidate
						className="needs-validation"
						encType="multipart/form-data"
					>
						<div className="mb-3">
							<label htmlFor="title" className="form-label m-0">
								Title:
							</label>
							<input
								type="text"
								placeholder="enter title"
								name="title"
								value={formData.title}
								onChange={handleOnChange}
								className="form-control"
								required
							/>
							<div className="valid-feedback">Title looks good!</div>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label m-0">
								Description:
							</label>
							<textarea
								name="description"
								placeholder="enter description"
								value={formData.description}
								onChange={handleOnChange}
								className="form-control"
								required
							></textarea>
							<div className="invalid-feedback">
								Please enter a short description
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="image" className="form-label m-0">
								Image:
							</label>
							<input
								type="file"
								name="image"
								placeholder="enter image"
								onChange={handleFileChange}
								className="form-control"
							/>
							<div className="invalid-feedback">Image should be valid</div>
						</div>
						<div className="row">
							<div className="mb-3 col-md-4">
								<label htmlFor="price" className="form-label m-0">
									Price:
								</label>
								<input
									name="price"
									placeholder="enter price"
									type="number"
									value={formData.price}
									onChange={handleOnChange}
									className="form-control"
									required
								/>
								<div className="invalid-feedback">Price should be valid</div>
							</div>

							<div className="mb-3 col-md-4">
								<label htmlFor="country" className="form-label m-0">
									Country:
								</label>
								<input
									type="text"
									name="country"
									placeholder="enter country"
									value={formData.country}
									onChange={handleOnChange}
									className="form-control"
									required
								/>
								<div className="invalid-feedback">
									Country name should be valid
								</div>
							</div>
							<div className="mb-3 col-md-4">
								<label htmlFor="category">Category:</label>
								<select
									id="category"
									name="category"
									className="form-control"
									value={formData.category}
									onChange={handleOnChange}
									required
								>
									{categories.map((category) => (
										<option key={category.value} value={category.value}>
											{category.label}
										</option>
									))}
								</select>
								<div className="invalid-feedback">
									Country name should be valid
								</div>
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
								value={formData.location}
								onChange={handleOnChange}
								className="form-control"
								required
							/>
							<div className="invalid-feedback">Location should be valid</div>
						</div>

						<button type="submit" className="btn btn-dark add-btn">
							Add
						</button>
						<br />
						<br />
					</form>
				</div>
			</div>
		</div>
	);
}
