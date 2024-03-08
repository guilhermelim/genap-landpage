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

    if (!id) {
      return res
        .status(400)
        .json({ message: "ID não fornecido na solicitação" });
    }

    if (id) {
      if (!isValidObjectId(id as string)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const singleData = await LeedsModel.findById(id);

      if (!singleData) {
        return res.status(404).json({ message: "Lead não encontrado" });
      }

      return res.status(200).json(singleData);
    }

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
