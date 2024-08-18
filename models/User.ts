import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
}, {
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true},
});

userSchema.virtual("workspaces", {
  ref: "Workspace",
  localField: "_id",
  foreignField: "author",
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
