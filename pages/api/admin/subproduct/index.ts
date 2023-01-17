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
        newSubProduct._id = req.body._id;
        newSubProduct.mainProduct = req.body.mainProduct;
        newSubProduct.partNo = mainProduct?.partNo + "-" + formattedTitle;
        newSubProduct.title = req.body.title;
        newSubProduct.setSlug!(req.body.title);
        newSubProduct.images = req.body.images;
        newSubProduct.colors = req.body.colors;
        newSubProduct.availableQty = req.body.availableQty;
        newSubProduct.discount = req.body.discount;
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

        // Check i Main product exists
        /*       const mainProduct: MainProductDocument | null =
          await MainProduct.findOne({
            _id: req.body.mainProduct,
          });

        if (!mainProduct) {
          return res.status(404).send({
            success: false,
            data: "Main product could not be found",
          });
        } */

        const todayDate = new Date()
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");
        //console.log(req.body);
        const updateSubProduct: SubProductDocument = req.body;
        //updateSubProduct.setSlug!(req.body.title);
        updateSubProduct.lastUpdated = todayDate;

        console.log(updateSubProduct);
        const subProduct = await SubProduct.findOneAndUpdate(
          { _id: req.body._id },
          updateSubProduct,
          {
            new: true,
            runValidators: true,
          }
        );

        console.log(subProduct);
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
