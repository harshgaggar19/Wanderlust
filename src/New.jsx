import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function New() {
	const navigate = useNavigate();
	const [redirect, setRedirect] = useState(false);
	let [formData, setFormData] = useState({
		title: "",
		description: "",
		image: "",
		price: "",
		location: "",
		country: "",
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log("submitting form data");
			// let response = await fetch("http://localhost:8080/listings/new", {
			// 	method: "post",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify(formData),
			// });
			// console.log(response);

			// console.log("Response status:", response.status);
			// const responseData = await response.json();
			// console.log("Response data:", responseData);

			axios
				.post("http://localhost:8080/listings/new", formData)
				.then((response) => {
					console.log("hello")
					console.log("Form data sent successfully:", response.data);
					// Handle response if needed
				})
				.catch((error) => {
					console.error("An error occurred while sending form data:", error);
					// Handle error if needed
				});

			// if (response.ok) {
			// 	console.log("form data submitted");
			// 	setRedirect(true);
			// 	navigate("/listings");
			// } else {
			// 	console.log("error in form submission");
			// }
		} catch (err) {
			console.log(err);
		}
	};

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	if (redirect) {
		return navigate("/listings");
	}

	return (
		<div>
			<h1>Create New listing</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					placeholder="enter title"
					value={formData.title}
					onChange={handleOnChange}
				/>
				<br />
				<textarea
					name="description"
					placeholder="enter description"
					value={formData.description}
					onChange={handleOnChange}
				></textarea>
				<br />
				<input
					type="text"
					name="image"
					placeholder="enter image"
					value={formData.image}
					onChange={handleOnChange}
				/>
				<br />
				<input
					name="price"
					placeholder="enter price"
					type="number"
					value={formData.price}
					onChange={handleOnChange}
				/>
				<br />
				<input
					type="text"
					name="country"
					placeholder="enter country"
					value={formData.country}
					onChange={handleOnChange}
				/>
				<br />
				<input
					type="text"
					name="location"
					placeholder="enter location"
					value={formData.location}
					onChange={handleOnChange}
				/>
				<br />
				<button type="submit">Add</button>
			</form>
		</div>
	);
}
