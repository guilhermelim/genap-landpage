import { NextApiRequest, NextApiResponse } from "next";
import cors from "@/utils/cors";

const obterEnderecoIP = async (): Promise<Record<string, any>> => {
  try {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Erro ao obter endereço IP:", error);
    return { error: true };
  }
};

const fetchWithCors = async (url: string) => {
  const corsAppliedResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      // Adicione outros cabeçalhos necessários aqui
    },
  });
  return corsAppliedResponse;
};

const getLocationFromIP = async (): Promise<Record<string, any>> => {
  try {
    const ip = await obterEnderecoIP();
    if (ip.error) {
      return {
        latitude: 0,
        longitude: 0,
        error: true,
      };
    }

    const locationData = await fetchWithCors(
      `https://www.ip2location.io/lookup-ip.json?ip=${ip}&token=850f1cc515938628f94326370638d720874f193a97a7b4b75bba2250091b8a30`
    );
    const data = locationData.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter localização:", error);
    return {
      latitude: 0,
      longitude: 0,
      error: true,
    };
  }
};

export default getLocationFromIP;
