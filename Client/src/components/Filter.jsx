import React from "react";
import "../css/filter.css";
import { filterData } from "../const/filterData";

const Filter = ({ onFilterChange }) => {
	const handleFilterClick = (filter) => {
		onFilterChange(filter);
	};
	return (
		<div className="icon-bar-wrapper">
			<div className="icon-bar d-flex justify-content-evenly align-items-center">
				{filterData.map((filter, idx) => (
					<div
						className="icon-item text-center"
						key={idx}
						onClick={() => handleFilterClick(filter.value)}
					>
						<i className={`fas ${filter.icon}`}></i>
						<div>{filter.title}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Filter;
