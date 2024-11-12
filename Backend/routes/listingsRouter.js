import express from "express";
const router = express.Router({ mergeParams: true });
import { authMiddleware } from "../utils/authMiddleware.js";
import { destroyListing, editListing, getListings, newListing, newListingImage, showListing } from "../controllers/listings.js";
import { validateListing } from "../utils/schemaValidationMiddleware.js";
import multer from "multer";
import { storage } from "../cloudConfig.js";
const upload = multer({ storage });

router.get("/", getListings);

// New Route
router.post(
	"/new",
	validateListing,
	authMiddleware,
	upload.single("image"),
	newListing
);

router.post(
	"/new/:id/upload-image",
	authMiddleware,
	upload.single("image"),
	newListingImage
);


router
	.route("/:id")
	.get(showListing)
	.delete(authMiddleware, destroyListing);

//Edit Route
router.patch(
	"/:id/edit",authMiddleware,
	editListing
);

export default router;