import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Edit() {
	const { id } = useParams();

	const [listing, setListing] = useState({});
	let [newFormData, setNewFormData] = useState({
		title: "",
		description: "",
		image: "",
		price: "",
		location: "",
		country: "",
	});

	useEffect(() => {
		let fetchListings = async () => {
			try {
				let response = await fetch(`http://localhost:8080/listings/${id}`);
				let result = await response.json();
				setListing(result);
				setNewFormData({
					title: result.title || "",
					description: result.description || "",
					image: result.image || "",
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
			console.log("submitting form data");
			let response = await fetch("http://localhost:8080/listings/new", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newFormData),
			});

			console.log("Response status:", response.status);
			const responseData = await response.json();
			console.log("Response data:", responseData);

			if (response.ok) {
				console.log("form data submitted");
				setRedirect(true);
			} else {
				console.log("error in form submission");
			}
		} catch (err) {
			console.log(err);
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
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					placeholder="enter title"
					value={newFormData.title}
					onChange={handleOnChange}
				/>
				<br />
				<textarea
					name="description"
					placeholder="enter description"
					value={newFormData.description}
					onChange={handleOnChange}
				></textarea>
				<br />
				<input
					type="text"
					name="image"
					placeholder="enter image"
					value={newFormData.image}
					onChange={handleOnChange}
				/>
				<br />
				<input
					name="price"
					placeholder="enter price"
					type="number"
					value={newFormData.price}
					onChange={handleOnChange}
				/>
				<br />
				<input
					type="text"
					name="country"
					placeholder="enter country"
					value={newFormData.country}
					onChange={handleOnChange}
				/>
				<br />
				<input
					type="text"
					name="location"
					placeholder="enter location"
					value={newFormData.location}
					onChange={handleOnChange}
				/>
				<br />
				<button type="submit">Add</button>
			</form>
		</div>
	);
}
