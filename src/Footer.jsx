import React from "react";
import "./css/Footer.css";

export default function Footer() {
	return (
		<div className="f-info">
			<div className="f-info-socials">
				<i className="fa-brands fa-square-facebook"></i>
				<i className="fa-brands fa-instagram"></i>
				<i className="fa-brands fa-linkedin"></i>
			</div>
			<div className="f-info-brand">&copy; Wanderlust Private Limited</div>
			<div className="f-info-links">
				<a href="/privacy">Privacy</a>
				<a href="/terms">Terms</a>
			</div>
		</div>
	);
}
