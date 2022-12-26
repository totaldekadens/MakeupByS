import dbConnect from "../../../../utils/dbConnect";
import MainProduct, {
  MainProductDocument,
} from "../../../../models/MainProduct";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        // Fix validation for already existing category except the one you update

        const updateMainProduct: MainProductDocument = new MainProduct();
        updateMainProduct._id = req.body._id;
        updateMainProduct.description1 = req.body.description1;
        updateMainProduct.description2 = req.body.description2;
        updateMainProduct.partNo = req.body.partNo;
        updateMainProduct.brand = req.body.brand;
        updateMainProduct.price = req.body.price;
        updateMainProduct.category = req.body.category;
        updateMainProduct.weight = req.body.weight;

        const mainProduct = await MainProduct.findOneAndUpdate(
          { id },
          updateMainProduct,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!mainProduct) {
          return res
            .status(400)
            .json({ success: false, data: "MainProduct not found" });
        }
        res.status(200).json({ success: true, data: mainProduct });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE":
      try {
        const deletedMainProduct = await MainProduct.deleteOne({ _id: id });
        if (!deletedMainProduct) {
          return res
            .status(400)
            .json({ success: false, data: "MainProduct not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "MainProduct is successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
