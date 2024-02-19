import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obtenha o endereço IP do usuário da solicitação
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Retorne o endereço IP no formato JSON
    res.status(200).json({ ip });
  } catch (error) {
    // Se ocorrer um erro, retorne um status de erro e uma mensagem
    console.error("Erro ao obter o endereço IP:", error);
    res.status(500).json({ message: "Ocorreu um erro ao obter o endereço IP" });
  }
}
