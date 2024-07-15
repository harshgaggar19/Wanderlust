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

const validateListing = (req, res, next) => {
	let { error } = listingSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};
const validateReview = (req, res, next) => {
	let { error } = reviewSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the Beach",
//         price: 1200,
//         location: "calangute,goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("successful testing");
// });

//index Route
app.get("/listings", (req, res) => {
	Listing.find({})
		.then((allListings) => {
			// console.log(allListings);
			res.json(allListings);
		})
		.catch((err) => {
			console.err(err);
		});
});
//New Route
app.get("/listings/new", (req, res) => {
	console.log("new route");
});

app.post(
	"/listings/new",
	validateListing,
	wrapAsync(async (req, res, next) => {
		const newListing = new Listing(req.body);
		await newListing.save();
		console.log("New listing created:", newListing);
		res.status(201).json(newListing);
	})
);

//show Route
app.get(
	"/listings/:id",
	wrapAsync(async (req, res) => {
		let { id } = req.params;
		let listing = await Listing.findById(id);
		console.log(listing);
		// console.log(listing);
		res.json(listing);
	})
);

//Edit Route
app.patch(
	"/listings/:id/edit",
	wrapAsync(async (req, res, next) => {
		let { id } = req.params;
		console.log(req.body);
		const upadatedListing = await Listing.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(201).json(upadatedListing);
	})
);

//Delete Route
app.delete(
	"/listings/:id",
	wrapAsync(async (req, res) => {
		let { id } = req.params;
		const deletedListing = await Listing.findByIdAndDelete(id);
		console.log(deletedListing);
		res.status(201).json(deletedListing);
	})
);

//reviews
app.post(
	"/listings/:id/reviews",
	validateReview,
	wrapAsync(async (req, res) => {
		let listing = await Listing.findById(req.params.id);
		let newReview = new Review(req.body.review);

		listing.reviews.push(newReview);

		await newReview.save();
		await listing.save();

		console.log("new review saved");
		res.status(201).json(newReview);
		// res.redirect(`/listings/${req.params.id}`);
	})
);

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
