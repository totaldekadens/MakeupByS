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

      const findSession = await stripe.checkout.sessions.retrieve(
        req.body.sessionId
      );

      if (findSession.payment_status == "paid") {
        //console.log(req.body.checkout);
        // Bara att pusha order nu! :)

        // Gets data in right format
        const todayDate = new Date()
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");

        // Adjust quantity on each product
        req.body.checkout.cartItems.forEach(async (item: LineItem) => {
          const subProduct = await SubProduct.findOne({
            _id: item.price_data.product_data.metadata.id,
          });

          const newAvailableQuantity = subProduct.availableQty - item.quantity;

          const newreservedQuantity = subProduct.reservedQty
            ? subProduct.reservedQty + item.quantity
            : 0 + item.quantity;

          const updateProduct: SubProductDocument = new SubProduct();
          updateProduct.availableQty = newAvailableQuantity;
          updateProduct.reservedQty = newreservedQuantity;
          updateProduct.lastUpdated = todayDate;

          const product = await SubProduct.findOneAndUpdate(
            { _id: subProduct._id },
            updateProduct,
            {
              new: true,
              runValidators: true,
            }
          );
          if (!product) {
            return res
              .status(400)
              .json({ success: false, data: "Product not updated" });
          }
        });

        res.status(200).json({ success: true, data: findSession });
        return;
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
