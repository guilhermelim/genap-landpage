import { NextApiRequest, NextApiResponse } from "next";
// utils
import { dbConnect, isValidObjectId } from "@/utils/db";
// models
import LeedsModel from "@/models/leeds";

export default async function deleteLeed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const { id } = req.query;

    if (!isValidObjectId(id as string)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const deletedLeeds = await LeedsModel.findByIdAndDelete(id);

    if (!deletedLeeds) {
      return res.status(404).json({ message: "Lead não encontrado" });
    }

    return res.status(200).json({
      message: "Lead deletado com sucesso.",
      data: deletedLeeds,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
}
