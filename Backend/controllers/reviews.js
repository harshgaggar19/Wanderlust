import Listing from "../models/listing.js";
import Review from "../models/review.js";
import wrapAsync from "../utils/wrapAsync.js";

export const createReview = wrapAsync(async (req, res) => {
	let listing = await Listing.findById(req.params.id);
	let newReview = new Review(req.body.review);
	newReview.author = req.userID;
	listing.review.push(newReview);
	await newReview.save();
	await listing.save();
	req.flash("success", "New Review Created!!");
	res.status(201).json({ newReview: newReview, success: req.flash("success") });
});

export const destroyReview = wrapAsync(async (req, res) => {
	let { id, reviewId } = req.params;
	let newListing = await Listing.findByIdAndUpdate(
		id,
		{ $pull: { review: reviewId } },
		{ new: true }
	);
	await Review.findByIdAndDelete(reviewId);
	console.log(newListing);
	req.flash("success", "Review Deleted!!");
	res.status(201).json(req.flash("success"));
});
