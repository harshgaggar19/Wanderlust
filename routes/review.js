import express from "express";
import wrapAsync from "../src/utils/wrapAsync.js";
import ExpressError from "../src/utils/ExpressError.js";
import { reviewSchema } from "../src/schema.js";
import Review from "../models/review.js";
import Listing from "../models/listing.js";
const router = express.Router({ mergeParams: true });
import cors from "cors";
router.use(cors());

//schema validation using joi
const validateReview = (req, res, next) => {
	let { error } = reviewSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};


//reviews
router.post(
	"/",
	validateReview,
	wrapAsync(async (req, res) => {
		let listing = await Listing.findById(req.params.id);
		let newReview = new Review(req.body.review);

		listing.review.push(newReview);

		await newReview.save();
		await listing.save();

		console.log("new review saved");
		res.status(201).json(newReview);
	})
);

//delete review route
router.delete(
	"/:reviewId",
	wrapAsync(async (req, res) => {
		let { id, reviewId } = req.params;
		let newListing = await Listing.findByIdAndUpdate(
			id,
			{ $pull: { review: reviewId } },
			{ new: true }
		);
		await Review.findByIdAndDelete(reviewId);
		console.log(newListing);

		res.status(201).json("deleted");
	})
);

export default router;