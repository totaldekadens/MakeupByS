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
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  if (!req.body) {
    return res.status(400).json({ success: false, data: "Check body" });
  }

  switch (method) {
    case "PUT":
      try {
        // Fix validation for already existing sub product except the one you update

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

        const todayDate = new Date()
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");

        const updateSubProduct: SubProductDocument = new SubProduct();
        updateSubProduct._id = req.body._id;
        updateSubProduct.mainProduct = req.body.mainProduct;
        updateSubProduct.partNo = mainProduct?.partNo + "-" + req.body.title;
        updateSubProduct.title = req.body.title;
        updateSubProduct.setSlug!(req.body.title);
        updateSubProduct.images = req.body.images;
        updateSubProduct.colors = req.body.colors;
        updateSubProduct.availableQty = req.body.availableQty;
        updateSubProduct.discount = req.body.discount;
        updateSubProduct.lastUpdated = todayDate;

        const subProduct = await SubProduct.findOneAndUpdate(
          { _id: id },
          updateSubProduct,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!subProduct) {
          return res
            .status(400)
            .json({ success: false, data: "SubProduct not found" });
        }
        res.status(200).json({ success: true, data: subProduct });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE":
      try {
        const deletedSubProduct = await SubProduct.deleteOne({ _id: id });
        if (deletedSubProduct.deletedCount < 1) {
          return res
            .status(400)
            .json({ success: false, data: "SubProduct not deleted" });
        }
        res
          .status(200)
          .json({ success: true, data: "SubProduct is successfully deleted" });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
