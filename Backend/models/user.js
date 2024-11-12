import mongoose from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	/*passportLocalMongoose automatically creates a username and password field along with hashing 
    and salting so even if you dont provide it it will automatically get created.*/
});

// userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);


export default User;