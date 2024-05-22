import express from "express";
const app = express();
const port = 8080;
import mongoose from "mongoose";
import Listing from "./models/listing.js";
import cors from "cors";

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

app.post("/listings/new", async (req, res) => {
	let newListing = new Listing(req.body);
	await newListing.save();
	console.log(newListing);
});

//edit route
app.get("/listings/:id/edit", (req, res) => {
	console.log("edit route");
})

//show Route
app.get("/listings/:id", async (req, res) => {
	let { id } = req.params;
	let listing = await Listing.findById(id);
	console.log(listing);
	res.json(listing);
});


app.listen(port, () => {
	console.log("listening to port 8080");
});
