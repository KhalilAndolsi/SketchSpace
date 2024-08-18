import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "Untitled"
    },
    elements: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Workspace = mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);
export default Workspace;
