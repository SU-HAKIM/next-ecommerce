import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../models/productsSchema";

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.query);
    let product = await Product.findById(req.query.pid);
    console.log(req.query);
    if (!product) {
      return res.status(400).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let product = await Product.findByIdAndDelete(req.query.pid);
    res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export default async function singularProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
    default:
      break;
  }
}
