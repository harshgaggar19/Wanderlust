import express from "express";
import passport from "passport";
const router = express.Router({ mergeParams: true });

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect:"/login/failed",
}))

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message:"LogIn Failure",
    })
})

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully logged in",
            user:req.user,
        })
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
})

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

export default router;