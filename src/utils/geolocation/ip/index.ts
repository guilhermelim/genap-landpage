import { default as ipapi } from "./ipapi";

export const getLocationFromIP = async (): Promise<Record<string, any>> => {
  try {
    const response = await ipapi();
    return response;
  } catch (error) {
    return {
      latitude: 0,
      longitude: 0,
      error: "Erro ao tentar obter a localização pelo IP.",
    };
  }
};
