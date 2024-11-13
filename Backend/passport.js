// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.CLIENT_ID,
// 			clientSecret: process.env.CLIENT_SECRET,
// 			callbackURL: "https://wanderlust-backend-harsh.onrender.com/auth/google/callback",
// 			scope: ["profile", "email"],
// 		},
// 		function (accessToken, refreshToken, profile, cb) {
// 			User.findOrCreate({ googleId: profile.id }, function (err, user) {
// 				return cb(err, user);
// 			});
// 		}
// 	)
// );

// passport.serializeUser((user, done) => {
// 	done(null, user);
// });

// passport.deserializeUser((user, done) => {
// 	done(null, user);
// });
