const getLocationFromIP = async (): Promise<Record<string, any>> => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
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
