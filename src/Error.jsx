import { useLocation } from "react-router-dom";


//to make a general error page you can pass a prop which has error message in it forom different pages and show it here
//this is not done yet 
function ErrorPage() {
	const location = useLocation();
	const errorMessage =
		location.state?.errorMessage || "An unknown error occurred";

	return (
		<div>
			<h1>Error</h1>
			<p>{errorMessage}</p>
		</div>
	);
}

export default ErrorPage;
