import mongoose from "mongoose";
import { getGravatarUrl } from "../../utils/gravatar.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar:{
        type: String,
        required: false,
        
        // add gravatar as default

    },
    
});

userSchema.method.comparePassword = async function (password) {
    return this.password === password;

}


userSchema.pre("save", function (next) {
  if (!this.avatar && this.email) {
    this.avatar = getGravatarUrl(this.email);
  }
  next();
});

const User = mongoose.model("User",userSchema);

export default User; 