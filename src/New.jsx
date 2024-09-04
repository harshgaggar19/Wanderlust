import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import useBootstrapValidation from "./utils/useBootstrapValidation";
import CheckAuthStatus from "./utils/CheckAuthStatus";

export default function New() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchAuthStatus = async () => {
			console.log("hello");
			const authStatus = await CheckAuthStatus();
			console.log("again");
			setIsAuthenticated(authStatus.authenticated);
			setUser(authStatus.user);
		};

		fetchAuthStatus();
	}, []);

	const navigate = useNavigate();
	let [formData, setFormData] = useState({
		title: "",
		description: "",
		image: "",
		price: "",
		location: "",
		country: "",
	});

	useBootstrapValidation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch("http://localhost:8080/listings/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ listing: formData }),
			});
			const responseData = await response.json();
			// console.log("Response data:", responseData);

			if (response.ok) {
				console.log("success", responseData.success[0]);
				console.log("form data submitted");
				navigate("/listings", {
					state: { message: responseData.success[0] },
				});
			}
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message);
			}
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

	return (
		<div className="container">
			{isAuthenticated ?
				<div className="row mt-3">
					<div className="col-8 offset-2">
						<h1>Create New listing</h1>
						<form onSubmit={handleSubmit} noValidate className="needs-validation">
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
									type="text"
									name="image"
									placeholder="enter image"
									value={formData.image}
									onChange={handleOnChange}
									className="form-control"
								/>
								<div className="invalid-feedback">
									Link address should be valid
								</div>
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

								<div className="mb-3 col-md-8">
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
				</div> : ""}
		</div>
	);
}
