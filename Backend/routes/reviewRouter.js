import express from "express";
const router = express.Router({ mergeParams: true });
import { authMiddleware } from "../utils/authMiddleware.js";
import { createReview, destroyReview } from "../controllers/reviews.js";
import { validateReview } from "../utils/schemaValidationMiddleware.js";

//reviews
router.post(
	"/",
	validateReview,authMiddleware,
	createReview
);

//delete review route
router.delete(
	"/:reviewId",authMiddleware,
	destroyReview
);

export default router;