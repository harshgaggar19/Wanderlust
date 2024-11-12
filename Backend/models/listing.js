import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Review from "./review.js";

const listingSchema = new Schema({
	title: { type: String, required: true },
	description: {
		type: String,
		required: true,
	},
	image: {
		filename: {
			type: String,
			default:
				"https://plus.unsplash.com/premium_photo-1663133679087-bc5deb50ab00?q=80&w=402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		}, // default can be adjusted as needed
		url: {
			type: String,
			default:
				"https://plus.unsplash.com/premium_photo-1663133679087-bc5deb50ab00?q=80&w=402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			set: (v) =>
				v === ""
					? "https://plus.unsplash.com/premium_photo-1663133679087-bc5deb50ab00?q=80&w=402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					: v,
		},
	},
	price: Number,
	location: String,
	country: String,
	review: [
		{
			type: Schema.Types.ObjectId,
			ref: "Review",
		},
	],
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	geometry: {
		type: {
			type: String, 
			enum: ["Point"],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	category: {
		type: String,
		required: true,
	},
});

listingSchema.post("findOneAndDelete", async (listing) => {
	if (listing) {
		await Review.deleteMany({ _id:{$in: listing.review}})
	}
})

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;