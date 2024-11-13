import React from "react";
import "./loader.css";

const Spinner = ({ size = "5.25em", color = "#fe424d" }) => {
    return (
			<div>
				<svg
					viewBox="25 25 50 50"
					style={{ width: size, marginLeft: "100px", marginTop: "20px" }}
				>
					<circle r="20" cy="50" cx="50" style={{ stroke: color }}></circle>
            </svg>
			</div>
		);
};

export default Spinner;
