import express from "express";
const app = express();
const port = 8080;
import mongoose from "mongoose";
import Listing from "./models/listing.js";
import cors from "cors";
import wrapAsync from "./src/utils/wrapAsync.js";
import ExpressError from "./src/utils/ExpressError.js";
import { listingSchema, reviewSchema } from "./src/schema.js";
import Review from "./models/review.js";
import passport from "passport";
import localStrategy from "passport-local";
import User from "./models/user.js";
import listings from "./routes/listing.js"
import reviews from "./routes/review.js"
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";

const sessionOptions = {
	secret: "mysupersecretcode",
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	},
};

app.use(session(sessionOptions));
app.use(flash());
app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	next();
})
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
	.then((res) => {
		console.log("connection made");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", (req, res) => {
	res.send("calling root");
});

app.use("/listings",listings)
app.use("/listings/:id/reviews", reviews);

//error handling
app.get("/admin", (req, res) => {
	throw new ExpressError();
});

app.all("*", (req, res, next) => {
	next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
	let { statusCode = 500, message = "Something went wrong" } = err;
	res.status(statusCode).json(message);
});

app.listen(port, () => {
	console.log("listening to port 8080");
});
