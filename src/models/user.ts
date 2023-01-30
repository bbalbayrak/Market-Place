import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  marketName: string;
  cart: ICart;
  favorites: IFavorites;
}

interface ICart {
  items: any;
}
interface IFavorites {
  favoriteItems: any;
}

const userSchema = new Schema<IUser>({
  name: {
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
  marketName: {
    type: String,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "premium", "marketOwner"],
  },
  favorites: {
    favoriteItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
  },
});

export default mongoose.model<IUser>("User", userSchema);
