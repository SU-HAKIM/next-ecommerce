import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../models/productsSchema";

export default async function createProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let newProduct = new Product(req.body);
    let result = await newProduct.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
