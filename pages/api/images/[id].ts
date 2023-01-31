import dbConnect from "../../../utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

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
    case "GET":
      try {
        const file = fs.readFileSync(`./public/uploads/${id}`);
        res.setHeader("Content-Type", "image");
        res.send(file);
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
  }
}
