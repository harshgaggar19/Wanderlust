import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import useBootstrapValidation from "./utils/useBootstrapValidation";

export default function Review({id}) {
	const location = useLocation();
	const navigate = useNavigate();
	const [formData2, setFormData2] = useState({
		review: {
			rating: "3",
			comment: "",
		},
	});

	useBootstrapValidation();

	const handleSubmit2 = async (e) => {
		e.preventDefault();
		try {
			console.log("submitting form data");
			console.log(location.pathname)
			
			const token = localStorage.getItem("token");
			let response = await fetch(
				`https://wanderlust-harshgaggar.onrender.com${location.pathname}/reviews`,
				{
					method: "post",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify(formData2),
				}
			);
			const responseData = await response.json();
			console.log(responseData)

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
				const errorData = responseData;
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
			<hr />
			<h4>Leave a Review</h4>
			<form onSubmit={handleSubmit2} noValidate className="needs-validation">
				<fieldset className="starability-slot">
					<p>Rating:</p>
					<input
						type="radio"
						id="no-rate"
						className="input-no-rate"
						name="rating"
						value="0"
						aria-label="No rating."
						onChange={handleOnChange2}
						checked={formData2.review.rating === "0"}
					/>
					<input
						type="radio"
						id="first-rate1"
						name="rating"
						value="1"
						onChange={handleOnChange2}
						checked={formData2.review.rating === "1"}
					/>
					<label htmlFor="first-rate1" title="Terrible">
						1 star
					</label>
					<input
						type="radio"
						id="first-rate2"
						name="rating"
						value="2"
						onChange={handleOnChange2}
						checked={formData2.review.rating === "2"}
					/>
					<label htmlFor="first-rate2" title="Not good">
						2 stars
					</label>
					<input
						type="radio"
						id="first-rate3"
						name="rating"
						value="3"
						onChange={handleOnChange2}
						checked={formData2.review.rating === "3"}
					/>
					<label htmlFor="first-rate3" title="Average">
						3 stars
					</label>
					<input
						type="radio"
						id="first-rate4"
						name="rating"
						value="4"
						onChange={handleOnChange2}
						checked={formData2.review.rating === "4"}
					/>
					<label htmlFor="first-rate4" title="Very good">
						4 stars
					</label>
					<input
						type="radio"
						id="first-rate5"
						name="rating"
						value="5"
						onChange={handleOnChange2}
						checked={formData2.review.rating === "5"}
					/>
					<label htmlFor="first-rate5" title="Amazing">
						5 stars
					</label>
				</fieldset>
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
