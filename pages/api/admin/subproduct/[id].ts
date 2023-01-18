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

  switch (method) {
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
