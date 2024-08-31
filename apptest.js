import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
const app = express();
const port = 8000;

app.use(cookieParser("xfdfaddfa"));
app.use(flash());

app.use(
	session({
		secret: "mysupersecretstring",
		resave: false,
        saveUninitialized: true,
        cookie: {
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
        }
	})
);

app.get("/sendcookies", (req, res) => {
    res.cookie("greet", "namaste",{signed:true});
    res.cookie("madeIn", "india");
    res.send("sent some cookies");
})

app.get("/register", (req, res) => {
    let { name="anonymous" } = req.query;
    req.session.name = name;
    console.log(name);
    req.flash("success", "user registered successfully");
    res.redirect("/hello");
})

app.get("/hello", (req, res) => {
    console.log(req.flash("success"));
    res.send(`Hello, ${req.session.name}`);
})

app.get("/", (req, res) => {
    console.log(req.signedCookies);
    res.send("accessed cookies");
})

app.listen(port, () => {
    console.log("listening to port 8000");
})