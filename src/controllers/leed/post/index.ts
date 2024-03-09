import { NextApiRequest, NextApiResponse } from "next";
// utils
import { dbConnect } from "@/utils/db";
// models
import LeedsModel from "@/models/leeds";

export default async function createLeed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const { queryParams, selectedOptions, fingerprinting } = req.body;

    const newLeeds = new LeedsModel({
      queryParams,
      selectedOptions,
      fingerprinting,
    });

    await newLeeds.save();

    return res.status(200).json({
      message: "Lead criado com sucesso.",
      date: newLeeds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
}
