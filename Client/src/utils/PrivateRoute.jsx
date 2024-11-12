import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const isAuthenticated = !!localStorage.getItem("token"); 
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/users/login" state={{ from: location }} replace />;
	}

	return children;
};

export default PrivateRoute;
