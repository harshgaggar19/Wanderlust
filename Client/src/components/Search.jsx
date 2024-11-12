import React, { useState } from "react";

const Search = () => {
	let [formData, setFormData] = useState({
		search: "",
	});
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		console.log("submitting")
	};
	

	return (
		<div>
			<form onSubmit={handleSubmit} className="needs-validation" noValidate>
				<input
					type="text"
					value={FormData.search}
					onChange={handleOnChange}
					placeholder="Search by location.."
					name="search"
					id="search"
					className="rounded-pill h-10 w-10 px-3 py-2 form-control"
				/>
				<span>
					<button className="rounded-pill px-3 py-2 ">
						<i className="fas fa-search text-danger-emphasis"></i>
					</button>
				</span>
			</form>
		</div>
	);
};

export default Search;
