import type { NextApiRequest, NextApiResponse } from "next";
// controllers
import {
  getLeed,
  createLeed,
  updateLeed,
  deleteLeed,
} from "@/controllers/leed";
// utils
import cors from "@/utils/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  switch (req.method) {
    case "GET":
      await getLeed(req, res);
      break;
    case "POST":
      await createLeed(req, res);
      break;
    case "PUT":
      await updateLeed(req, res);
      break;
    case "DELETE":
      await deleteLeed(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
