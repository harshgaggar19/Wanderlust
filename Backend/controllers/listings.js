import Listing from "../models/listing.js";
import wrapAsync from "../utils/wrapAsync.js";

import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding-v6.js";

const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

export const getListings = wrapAsync(async (req, res) => {
	let { filter } = req.query;
	console.log(filter);
	let allListings = null;
	if (filter) {
		allListings = await Listing.find({ category: filter });
		console.log(allListings);
	} else {
		allListings = await Listing.find();
	}
	res.json(allListings);
});

export const mylistings = wrapAsync(async (req, res) => {
	try {
		const listings = await Listing.find({ owner: req.userID });
		res.json(listings);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
})

export const newListing = wrapAsync(async (req, res, next) => {
	let response = await geocodingClient
		.forwardGeocode({
			query: req.body.listing.location,
			limit: 1,
		})
		.send();

	let newListing = new Listing(req.body.listing);
	newListing.owner = req.userID;
	newListing.geometry = response.body.features[0].geometry;
	newListing = await newListing.save();
	console.log(newListing);
	req.flash("success", "New Listing created!!");
	console.log("New listing created:", newListing);
	res
		.status(201)
		.json({ newListing: newListing, success: req.flash("success") });
});

export const newListingImage = wrapAsync(async (req, res) => {
	let { id } = req.params;
	const listing = await Listing.findById(id, { new: true });
	if (!listing) {
		return res.status(404).json({ message: "Listing not found" });
	}
	listing.image = {
		filename: req.file.filename,
		url: req.file.path,
	};
	await listing.save();
	res.status(200).json({ message: "Image uploaded successfully", listing });
});

export const showListing = wrapAsync(async (req, res) => {
	let { id } = req.params;
	let listing = await Listing.findById(id)
		.populate({ path: "review", populate: { path: "author" } })
		.populate("owner");
	res.json(listing);
});

export const editListing = wrapAsync(async (req, res, next) => {
	let { id } = req.params;
	console.log(req.body);

	const listing = await Listing.findById(id);

	if (listing.owner._id == req.userID) {
		const upadatedListing = await Listing.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		req.flash("success", "Listing Updated!!");
		res.status(201).json({
			upadatedListing: upadatedListing,
			success: req.flash("success"),
		});
	} else {
		res.status(500).json("You are not the owner of the listing.");
	}
});

export const destroyListing = wrapAsync(async (req, res) => {
	let { id } = req.params;
	const deletedListing = await Listing.findByIdAndDelete(id);
	req.flash("success", "Listing Deleted!!");
	console.log(deletedListing);
	res
		.status(201)
		.json({ deletedListing: deletedListing, success: req.flash("success") });
});
