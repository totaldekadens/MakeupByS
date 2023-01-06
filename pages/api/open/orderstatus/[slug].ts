import dbConnect from "../../../../utils/dbConnect";
import OrderStatus from "../../../../models/OrderStatus";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const orderStatus = await OrderStatus.findOne({ slug });

        if (!orderStatus) {
          return res
            .status(400)
            .json({ success: false, data: "OrderStatus not found" });
        }
        res.status(200).json({ success: true, data: orderStatus });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
