import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Review() {
	const location = useLocation();
	const navigate = useNavigate();
	const [formData2, setFormData2] = useState({
		review: {
			rating: "3",
			comment: "",
		},
	});

	useEffect(() => {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		const forms = document.querySelectorAll(".needs-validation");

		// Loop over them and prevent submission
		Array.from(forms).forEach((form) => {
			form.addEventListener(
				"submit",
				(event) => {
					if (!form.checkValidity()) {
						event.preventDefault();
						event.stopPropagation();
					}

					form.classList.add("was-validated");
				},
				false
			);
		});
	}, []);

	const handleSubmit2 = async (e) => {
		e.preventDefault();
		try {
			console.log("submitting form data");
			let response = await fetch(
				`http://localhost:8080${location.pathname}/reviews`,
				{
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData2),
				}
			);
			console.log(response);

			console.log("Response status:", response.status);
			const responseData = await response.json();
			console.log("Response data:", responseData);

			if (response.ok) {
				console.log("form data submitted");
				setFormData2({
					review: {
						rating: "3",
						comment: "",
					},
				});
				navigate(`${location.pathname}`);
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message);
			}
		} catch (err) {
			navigate("/error", { state: { errorMessage: err.message } });
		}
	};

	const handleOnChange2 = (e) => {
		const { name, value } = e.target;
		setFormData2((prevState) => ({
			...prevState,
			review: {
				...prevState.review,
				[name]: value,
			},
		}));
	};

	return (
		<div className="col-8 offset-3 container">
			<h4>Leave a Review</h4>
			<form onSubmit={handleSubmit2} noValidate className="needs-validation">
				<div className="mb-3 mt-3">
					<label htmlFor="rating" className="form-label">
						Rating
					</label>
					<input
						type="range"
						min={1}
						max={5}
						id="rating"
						name="rating"
						className="form-range"
						onChange={handleOnChange2}
						value={formData2.review.rating}
					/>
				</div>
				<div className="mb-3 mt-3">
					<label htmlFor="comment" className="form-label">
						Comments
					</label>
					<textarea
						name="comment"
						onChange={handleOnChange2}
						id="comment"
						cols={30}
						rows={5}
						value={formData2.review.comment}
						className="form-control"
						required
					></textarea>
					<div className="invalid-feedback">
						Please submit a valid review.
					</div>
				</div>
				<button type="submit" className="btn btn-outline-dark">
					Submit
				</button>
			</form>
		</div>
	);
}
