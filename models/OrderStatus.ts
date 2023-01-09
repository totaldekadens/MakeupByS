import mongoose, { Types } from "mongoose";

const OrderStatusSchema = new mongoose.Schema<OrderStatusDocument>({
  status: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export type OrderStatusDocument = {
  status: string;
  description: string;
  color: string;
  _id?: Types.ObjectId;
};

export default mongoose.models.OrderStatus ||
  mongoose.model("OrderStatus", OrderStatusSchema);
