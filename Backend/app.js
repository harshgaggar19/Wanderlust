import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT || 8080;
import mongoose from "mongoose";
import cors from "cors";
import ExpressError from "./utils/ExpressError.js";
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
import listingsRouter from "./routes/listingsRouter.js";
import reviewsRouter from "./routes/reviewRouter.js";
import usersRouter from "./routes/usersRouter.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";


const store = MongoStore.create({
	mongoUrl: process.env.MONGO_URL,
	crypto: {
		secret: "mysupersecretcode"
	},
	touchAfter: 24 * 60 * 60,
})

store.on("error", () => {
	console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions = {
	store,
	secret: "mysupersecretcode",
	resave: false, //the session will only be saves if it was modified during the request
	saveUninitialized: true, //this controls whether to save a session that is new but not yet modified
	cookie: {
		expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		secure: false,
		path:"/"
	},
};
app.use(session(sessionOptions));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
	.then((res) => {
		console.log("connection made");
	})
	.catch((err) => console.log(err));


async function main() {
	await mongoose.connect(process.env.MONGO_URL);
}


// app.use(passport.initialize()); //Initializes Passpport
// app.use(passport.session()); //to keep a track of user that the use which has already logged in is not trying to access the page or not i.e. session handling
// passport.use(new LocalStrategy(User.authenticate())); //tells that we will be using passport's local strategy for authentication

// passport.serializeUser(User.serializeUser()); //it is used to store some user data into the session
// passport.deserializeUser(User.deserializeUser()); //it is used to deserialize user data using the data strored while serializing
app.use(flash());

app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	next();
});

app.get("/", (req, res) => {
	res.send("calling root");
});

app.use("/users", usersRouter);
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);

//error handling
app.get("/admin", (req, res) => {
	throw new ExpressError();
});

app.all("*", (req, res, next) => {
	next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
	let { statusCode = 500, message = "Something went wrong" } = err;
	res.status(statusCode).json(message);
});

app.listen(port, () => {
	console.log("listening to port 8080");
});
