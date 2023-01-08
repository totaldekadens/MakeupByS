import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { LineItem } from "../../../../components/AddToCartIcon";
import ProductCard from "../../../../components/ProductCard";
import Order from "../../../../models/Order";
import SubProduct, { SubProductDocument } from "../../../../models/SubProduct";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

// Creates an order in stripe
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
    method,
  } = req;

  if (req.method === "POST") {
    try {
      if (!req.body) {
        return res.status(400).json({ success: false, data: "Check body" });
      }

      const findOrder = await Order.findOne({
        orderNoStripe: req.body.sessionId,
      });
      if (findOrder) {
        res
          .status(400)
          .json({ success: false, data: "Ordern existerar redan" });
        return;
      }

      // Gets data in right format
      const todayDate = new Date().toISOString().slice(0, 16).replace("T", " ");

      res
        .status(200)
        .json({ success: false, data: "Du har kommit till skapa order" });
    } catch (err) {
      res.status(500).json({ success: false, data: err });
    }
  } else if (req.method === "PUT") {
    try {
      if (!req.body) {
        return res.status(400).json({ success: false, data: "Check body" });
      }

      const findOrder = await Order.findOne({
        orderNoStripe: req.body.sessionId,
      });
      if (findOrder) {
        res
          .status(400)
          .json({ success: false, data: "Ordern existerar redan" });
        return;
      }

      // Gets data in right format
      const todayDate = new Date().toISOString().slice(0, 16).replace("T", " ");

      // return res.status(200).json({ success: true, data: req.body.cartItem });

      // Adjust quantity on each product

      const subProduct = await SubProduct.findOne({
        _id: req.body.cartItem.price_data.product_data.metadata.id,
      });
      ////////////
      // Gör en check på antalet så att det inte kan bli minus.!!!!!!!
      ////////////
      console.log("subProduct" + subProduct);
      if (subProduct) {
        const newAvailableQuantity =
          subProduct.availableQty - req.body.cartItem.quantity;

        const newreservedQuantity = subProduct.reservedQty
          ? subProduct.reservedQty + req.body.cartItem.quantity
          : 0 + req.body.cartItem.quantity;

        const product = await SubProduct.findOneAndUpdate(
          { _id: req.body.cartItem.price_data.product_data.metadata.id },
          {
            $set: {
              availableQty: newAvailableQuantity,
              reservedQty: newreservedQuantity,
              lastUpdated: todayDate,
            },
          },
          {
            new: true,
            runValidators: true,
            multi: true,
          }
        );
        console.log(product);
        if (!product) {
          return res
            .status(400)
            .json({ success: false, data: "Product not updated" });
        }
        return res.status(200).json({ success: true, data: product });
      }
      res.status(400).json({ success: false, data: "Ordern är inte betald" });
    } catch (err) {
      res.status(500).json({ success: false, data: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export const tjo = async (req: NextApiRequest, res: NextApiResponse) => {};
