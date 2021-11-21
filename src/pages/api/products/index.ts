import { NextApiRequest, NextApiResponse } from "next";
import initDB from "../../../../helpers/initDB";
import Product from "../../../../models/productsSchema";

initDB();

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let products = await Product.find();
  res.status(200).json(products);
}
