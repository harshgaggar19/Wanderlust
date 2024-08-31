import mongoose from "mongoose";
import initData from "../init/data.js";
import Listing from "../models/listing.js";
import Review from "../models/review.js";

main()
	.then((res) => {
		console.log("connection made");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
	await Listing.deleteMany({});
	await Review.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

}

initDB();