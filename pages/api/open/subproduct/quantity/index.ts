import dbConnect from "../../../../../utils/dbConnect";
import SubProduct, {
  SubProductDocument,
} from "../../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  if (!req.body) {
    return res.status(400).json({ success: false, data: "Check body" });
  }

  switch (method) {
    case "PUT":
      try {
        // Fix validation for already existing subProduct except the one you update
        console.log(req.body.cartItems);
        /*  const updateSubProduct: SubProductDocument = new SubProduct();
        updateSubProduct._id = req.body._id;

        const subProduct = await SubProduct.findOneAndUpdate(
          {
            
          },
          updateSubProduct,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!subProduct) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: subProduct }); */
        res.status(200).json({ success: true, data: "Kom in!" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
