import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";

export default function Review({id}) {
	const location = useLocation();
	const navigate = useNavigate();
	const [formData2, setFormData2] = useState({
		review: {
			rating: "3",
			comment: "",
		},
	});

	useEffect(() => {
		const forms = document.querySelectorAll(".needs-validation");

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
			console.log(location.pathname)
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
			const responseData = await response.json();

			if (response.ok) {
				console.log("form data submitted");
				e.target.classList.remove("was-validated");
				setFormData2({
					review: {
						rating: "3",
						comment: "",
					},
				});
				console.log(id)
				navigate(`/listings/${id}`, {
					state: { message: responseData.success[0] },
				});
				window.location.reload();

			} else {
				const errorData = await response.json();
				throw new Error(errorData.message);
			}
		} catch (err) {
			console.log(err);
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
		<div className="col-md-8 offset-md-3 container mb-3">
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
					<div className="invalid-feedback">Please submit a valid review.</div>
				</div>
				<button type="submit" className="btn btn-outline-dark">
					Submit
				</button>
			</form>
		</div>
	);
}
