import dbConnect from "../../../../utils/dbConnect";
import SingleProduct, {
  SingleProductDocument,
} from "../../../../models/SingleProduct";
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

        const updateSingleProduct: SingleProductDocument = new SingleProduct();
        updateSingleProduct._id = req.body._id;
        updateSingleProduct.title = req.body.title;
        updateSingleProduct.description1 = req.body.description1;
        updateSingleProduct.description2 = req.body.description2;
        updateSingleProduct.setSlug(req.body.title);
        updateSingleProduct.partNo = req.body.partNo;
        updateSingleProduct.brand = req.body.brand;
        updateSingleProduct.price = req.body.price;
        updateSingleProduct.images = req.body.images;
        updateSingleProduct.colors = req.body.colors;
        updateSingleProduct.category = req.body.category;
        updateSingleProduct.availableQty = req.body.availableQty;
        updateSingleProduct.weight = req.body.weight;

        const singleProduct = await SingleProduct.findOneAndUpdate(
          { id },
          updateSingleProduct,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!singleProduct) {
          return res
            .status(400)
            .json({ success: false, data: "SingleProduct not found" });
        }
        res.status(200).json({ success: true, data: singleProduct });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    case "DELETE":
      try {
        const deletedSingleProduct = await SingleProduct.deleteOne({ _id: id });
        if (!deletedSingleProduct) {
          return res
            .status(400)
            .json({ success: false, data: "SingleProduct not deleted" });
        }
        res
          .status(200)
          .json({
            success: true,
            data: "SingleProduct is successfully deleted",
          });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
