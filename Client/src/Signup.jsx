import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./js/script";
import useBootstrapValidation from "./utils/useBootstrapValidation";

const Signup = () => {
	const location = useLocation();
	const navigate = useNavigate();
	let initialMessage = location.state	?.message || null;
	const [message, setMessage] = useState(initialMessage);
	let [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
    });
	useBootstrapValidation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch(
				"https://wanderlust-harshgaggar.onrender.com/users/signup",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);
			const responseData = await response.json();

			if (response.ok) {
				localStorage.setItem("token", "Bearer " + responseData.token);
				navigate("/listings", {
					state: { message: responseData.success,user: responseData.registerdUser },
				});
			} else {
                setMessage(responseData.message || "SignUp failed.")
            }
			
		} catch (err) {
			setMessage("SignUp failed.");
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
			{message && (
				<div className="alert alert-danger alert-dismissible fade show col-6 offset-3">
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
				<div className="col-8 offset-2">
					<h1>Signup on Wanderlust</h1>
					<form onSubmit={handleSubmit} className="needs-validation" noValidate>
						<div className="mb-3">
							<label htmlFor="username" className="form-label m-0">
								Username:
							</label>
							<input
								type="text"
								name="username"
								placeholder="enter username"
								value={formData.username}
								onChange={handleOnChange}
								className="form-control"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="email" className="form-label m-0">
								Email:
							</label>
							<input
								type="email"
								name="email"
								placeholder="enter email"
								value={formData.email}
								onChange={handleOnChange}
								className="form-control"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label m-0">
								Password:
							</label>
							<input
								type="password"
								name="password"
								placeholder="enter password"
								value={formData.password}
								onChange={handleOnChange}
								className="form-control"
								required
							/>
						</div>
						<button type="submit" className="btn btn-dark edit-btn">
							Sign Up
						</button>
						<br />
						<br />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
