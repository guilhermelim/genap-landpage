import { NextApiRequest, NextApiResponse } from "next";
// utils
import { dbConnect, isValidObjectId } from "@/utils/db";
// models
import LeedsModel from "@/models/leeds";

export default async function updateLeed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const { id } = req.query;
    const { queryParams, selectedOptions, fingerprinting } = req.body;

    if (!isValidObjectId(id as string)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const updatedLeeds = await LeedsModel.findByIdAndUpdate(
      id,
      { queryParams, selectedOptions, fingerprinting },
      { new: true }
    );

    if (!updatedLeeds) {
      return res.status(404).json({ message: "Lead não encontrado" });
    }

    return res.status(200).json({
      message: "Lead atualizado com sucesso.",
      data: updatedLeeds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
}
