import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  marketName: string;
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
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "marketOwner"],
  },
});

export default mongoose.model<IUser>("User", userSchema);
