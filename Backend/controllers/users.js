import User from "../models/user.js";
import wrapAsync from "../utils/wrapAsync.js";
import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../config.js";

export const signup = wrapAsync(async (req, res) => {
	let newUser = new User(req.body);
	// let registeredUser = await User.register(newUser, password);
	let registeredUser = await newUser.save();
	console.log(registeredUser);
	const userID = registeredUser._id;
	console.log("userID", userID);
	const payload = { userID: userID };
	const options = { expiresIn: "8h" };
	try {
		const token = jwt.sign(payload, process.env.JWT_SECRET, options);
		return res.status(200).json({
			message: "New user created",
			token: token,
			success: "Welcome to Wanderlust!!",
			registeredUser: registeredUser,
		});
	} catch (e) {
		return res.status(500).json({
			error: true,
			message: e.message || "Something went wrong during registration",
		});
	}
});

export const login = async (req, res, next) => {
	const { username, password } = req.body;

	const user = await User.findOne({
		$and: [{ username: username }, { password: password }],
	});

	if (!user) {
		return res.status(403).json({
			message: "User not found",
		});
	}

	const userID = user._id;
	const payload = { userID: userID, role: "user" };
	const options = { expiresIn: "8h" };

	try {
		const token = jwt.sign(payload, process.env.JWT_SECRET, options);

		return res.status(200).json({
			message: "User sucessfully signed in",
			token: token,
			success: "login success",
			user: user,
		});
	} catch (e) {
		return res.status(500).json({
			message: "Error in creating JWT",
		});
	}
};