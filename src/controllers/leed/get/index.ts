import { NextApiRequest, NextApiResponse } from "next";
// utils
import { dbConnect, isValidObjectId } from "@/utils/db";
// models
import LeedsModel from "@/models/leeds";

export default async function getLeed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const { id } = req.query;

    // Se um ID for fornecido, obtenha o lead correspondente.
    if (id && isValidObjectId(id as string)) {
      const singleData = await LeedsModel.findById(id);
      if (!singleData) {
        return res.status(404).json({ message: "Lead não encontrado" });
      }
      return res.status(200).json(singleData);
    }

    // Se nenhum ID for fornecido, obtenha todos os leads.
    const allData = await LeedsModel.find();
    if (allData.length === 0) {
      return res.status(404).json({ message: "Nenhum lead cadastrado" });
    }
    return res.status(200).json(allData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
}
