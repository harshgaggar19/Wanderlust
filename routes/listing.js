import express from "express";
import Listing from "../models/listing.js";
import wrapAsync from "../src/utils/wrapAsync.js";
import ExpressError from "../src/utils/ExpressError.js";
import { listingSchema } from "../src/schema.js";
const router = express.Router({ mergeParams: true });
import cors from "cors";
router.use(cors());


//schema validation using joi
const validateListing = (req, res, next) => {
    console.log("validation going on");
    let { error } = listingSchema.validate(req.body);
	if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        console.log("errMsg",errMsg)
		throw new ExpressError(400, errMsg);
	} else {
		next();
	}
};


router.get("/", (req, res) => {
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
router.post(
	"/new",
	validateListing,
    wrapAsync(async (req, res, next) => {
		const newListing = new Listing(req.body.listing);
		await newListing.save();
		console.log("New listing created:", newListing);
		res.status(201).json(newListing);
	})
);

//show Route
router.get(
	"/:id",
	wrapAsync(async (req, res) => {
		let { id } = req.params;
		let listing = await Listing.findById(id).populate("review");
		// console.log(listing);
		res.json(listing);
	})
);

//Edit Route
router.patch(
	"/:id/edit",
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
router.delete(
	"/:id",
	wrapAsync(async (req, res) => {
		let { id } = req.params;
		const deletedListing = await Listing.findByIdAndDelete(id);
		console.log(deletedListing);
		res.status(201).json(deletedListing);
	})
);

export default router;