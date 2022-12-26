import dbConnect from "../../../../utils/dbConnect";
import SubProduct, { SubProductDocument } from "../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";
import MainProduct, {
  MainProductDocument,
} from "../../../../models/MainProduct";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        // Check i Main product exists
        const mainProduct: MainProductDocument | null =
          await MainProduct.findOne({
            _id: req.body.mainProduct,
          });

        if (!mainProduct) {
          return res.status(404).send({
            success: false,
            data: "Main product could not be found",
          });
        }

        // Check if new part number is unique
        const subProductExist = await SubProduct.findOne({
          partNo: mainProduct?.partNo + "-" + req.body.title,
        });

        if (subProductExist) {
          return res.status(403).send({
            success: false,
            data: "A main product with this part number already exists",
          });
        }

        const newSubProduct: SubProductDocument = new SubProduct();
        newSubProduct._id = req.body._id;
        newSubProduct.mainProduct = req.body.mainProduct;
        newSubProduct.partNo = mainProduct?.partNo + "-" + req.body.title;
        newSubProduct.title = req.body.title;
        newSubProduct.setSlug(req.body.title);
        newSubProduct.images = req.body.images;
        newSubProduct.colors = req.body.colors;
        newSubProduct.availableQty = req.body.availableQty;
        newSubProduct.discount = req.body.discount;

        const subProduct = await SubProduct.create(newSubProduct);
        res.status(201).json({ success: true, data: subProduct });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
