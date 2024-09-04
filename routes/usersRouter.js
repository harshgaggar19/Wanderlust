import express from "express";
import user from "../models/user.js";
import ExpressError from "../src/utils/ExpressError.js";

const router = express.Router({ mergeParams: true });
import cors from "cors";
import User from "../models/user.js";
import wrapAsync from "../src/utils/wrapAsync.js";
import passport from "passport";
router.use(cors());


router.get("/auth", (req, res, next) => {
	console.log(req.user);
	if (req.isAuthenticated()) {
		console.log("user check");
		res.json({ authenticated: true, user: req.user });
	} else {
		res.json({ authenticated: false });
	}
})

router.post(
	"/signup",
	wrapAsync(async (req, res) => {
		try {
			let { username, email, password } = req.body;
			let newUser = new User({ username, email });
			let registeredUser = await User.register(newUser, password);
			console.log(registeredUser);
			res.status(201).json({
				registeredUser: registeredUser,
				success: "Welcome to Wanderlust!!",
			});
		} catch (err) {
			res.status(400).json({
				error: true,
				message: err.message || "Something went wrong during registration",
			});
		}
	})
);

router.post("/login",async (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return res.status(500).json({
				error: true,
				message: err.message || "An unexpected error occurred during login",
			});
		}
		if (!user) {
			return res.status(401).json({
				error: true,
				message: info.message || "Invalid credentials, please try again.",
			});
		}

		req.logIn(user, (err) => {
			if (err) {
				return res.status(500).json({
					error: true,
					message: err.message || "Failed to log in user.",
				});
			}

			console.log("User successfully logged in:", req.user);
			return res.status(200).json({ success: "Welcome to Wanderlust!", user });
		});
	})(req, res, next);
});


export default router;
