import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Processing",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Processing",
    },
    TotalPrice: {
      type: Number,
      required: true,
    },
    OrderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderModel);
