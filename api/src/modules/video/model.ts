import mongoose from "mongoose";
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  fileId: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  product: { type: String, required: true },
  length: { type: Number, required: true },
  skipTimer: { type: Number, default: 30 },
  postDate: { type: Number, required: true, default: Date.now },
  coinValue: { type: Number, required: true, default: 5 },
  clicks: { type: Number, default: 0 },
  tags: { type: [String], required: false },
});

export default mongoose.model("Author", videoSchema);
