import axios from "axios";

const CheckAuthStatus = async () => {
	try {
		const response = await axios("http://localhost:8080/users/auth", {
			withCredentials: true,
		});
		console.log("inside checkAuthStatus");
		console.log(response.data);
		return response.data;
	} catch (err) {
		console.log("error checking authentication status:", err);
		return { authenticated: false };
	}
};

export default CheckAuthStatus;