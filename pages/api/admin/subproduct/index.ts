import dbConnect from "../../../../utils/dbConnect";
import SubProduct, { SubProductDocument } from "../../../../models/SubProduct";
import { NextApiRequest, NextApiResponse } from "next";
import MainProduct, {
  MainProductDocument,
} from "../../../../models/MainProduct";
import useSlugify from "../../../../utils/useSlugify";

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

        const formattedTitle = useSlugify(req.body.title);
        const todayDate = new Date()
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");

        const newSubProduct: SubProductDocument = new SubProduct();
        newSubProduct.title = req.body.title;
        newSubProduct.mainProduct = req.body.mainProduct;
        newSubProduct.images = req.body.images;
        newSubProduct.availableQty = req.body.availableQty;
        newSubProduct.colors = req.body.colors;
        newSubProduct.partNo = mainProduct?.partNo + "-" + formattedTitle;
        newSubProduct.setSlug(req.body.title);
        newSubProduct.createdDate = todayDate;
        newSubProduct.lastUpdated = todayDate;

        const subProduct = await SubProduct.create(newSubProduct);

        res.status(201).json({ success: true, data: subProduct });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    case "PUT":
      try {
        // Fix validation for already existing sub product except the one you update

        const todayDate = new Date()
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");

        const updateSubProduct: SubProductDocument = req.body;
        updateSubProduct.lastUpdated = todayDate;

        const subProduct = await SubProduct.findOneAndUpdate(
          { _id: req.body._id },
          updateSubProduct,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!subProduct) {
          return res
            .status(400)
            .json({ success: false, data: "Product not found" });
        }
        res.status(200).json({ success: true, data: subProduct });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Break error" });
      break;
  }
}
