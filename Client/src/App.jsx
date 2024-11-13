import React, { useState, useEffect } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Show from "./Show";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Listings from "./Listings";
import New from "./New";
import Edit from "./Edit";
import Layout from "./Layout";
import ErrorPage from "./Error";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "./utils/PrivateRoute";
import MyListings from "./MyListings";

export default function App() {
	const [authorized, setAuthorized] = useState(false);

	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token) {
			setAuthorized(true);
		}
	}, [token]);

	// const [user, setUser] = useState(null);

	// const getUser = async () => {
	// 	try {
	// 		const url = "https://wanderlust-backend-harsh.onrender.com/auth/login/success";
	// 		const { data } = await axios.get(url, { withCredentials: true })
	// 		setUser(data.user._json)
	// 		console.log(data);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	// useEffect(() => {
	// 	getUser();
	// }, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="listings" index element={<Listings />} />
					<Route
						path="listings/new"
						element={
							<PrivateRoute>
								<New />
							</PrivateRoute>
						}
					/>
					<Route path="listings/:id" element={<Show />} />
					<Route
						path="listings/:id/edit"
						element={
							<PrivateRoute>
								<Edit />
							</PrivateRoute>
						}
					/>
					<Route
						path="listings/mylistings"
						element={
							<PrivateRoute>
								<MyListings />
							</PrivateRoute>
						}
					/>
					<Route path="/users/signup" element={<Signup />} />
					<Route path="/users/login" element={<Login />} />
				</Route>
				<Route path="*" element={<Navigate to="/listings" />} />
				<Route path="/error" element={<ErrorPage />} />
			</Routes>
		</Router>
	);
}
