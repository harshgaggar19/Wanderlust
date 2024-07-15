import mongoose from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
})

const User = mongoose.model("User", userSchema);

// User.plugin(passportLocalMongoose);

export default User;