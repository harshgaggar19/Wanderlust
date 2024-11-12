import ExpressError from "./ExpressError.js";
import { reviewSchema,listingSchema } from "../schema.js";

export const validateListing = (req, res, next) => {
	let { error } = listingSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		console.log("errMsg", errMsg);
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};

export const validateReview = (req, res, next) => {
	let { error } = reviewSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};