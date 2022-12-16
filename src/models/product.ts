import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

interface IProduct {
  title: string;
  price: number;
  description: string;
  userId: Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.model<IProduct>("Product", productSchema);
