import { useEffect } from "react";

const useBootstrapValidation = () => {
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
};

export default useBootstrapValidation;
