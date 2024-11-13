import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBootstrapValidation from "./utils/useBootstrapValidation";

const Login = () => {
	const location = useLocation();
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	let initialMessage = location.state?.message || null;
	const [message, setMessage] = useState(initialMessage);
	let [formData, setFormData] = useState({
		username: "",
		password: "",
    });
    useBootstrapValidation();
    
	useEffect(() => {
		if (message) {
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [message, navigate, location.pathname]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch(
				"https://wanderlust-harshgaggar.onrender.com/users/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify(formData),
				}
			);
            console.log(response);
			const responseData = await response.json();

			console.log("Response data:", responseData);

			if (response.ok) {
				console.log("success", responseData.success);
				const token = responseData.token;
				localStorage.setItem("token", "Bearer " + token);
				const prevPath = location.state ? location.state.from : "/listings"
				navigate(prevPath, {
					state: { message: responseData.success },
				});
			} else {
				setMessage(responseData.message || "Username or Password is wrong" );
			}
		} catch (err) {
			setMessage(responseData.message || "S");
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
					<h1>Login on Wanderlust</h1>
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
						<div>
							Dont have an account?{" "}
							<b>
								<a href="/users/signup" className="navbar-brand">
									Signup
								</a>{" "}
							</b>
						</div>
						<br />
						<button type="submit" className="btn btn-dark edit-btn">
							Login
						</button>
						<br />
						<br />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
