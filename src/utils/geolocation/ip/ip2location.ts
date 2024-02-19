const getLocationFromIP = async (): Promise<Record<string, any>> => {
  try {
    const ip = "Receba o ip aqui";
    const response = await fetch(
      `https://www.ip2location.io/lookup-ip.json?ip=${ip}&token=850f1cc515938628f94326370638d720874f193a97a7b4b75bba2250091b8a30`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao obter localização:", error);
    return {
      latitude: 0,
      longitude: 0,
      error: "Erro ao tentar obter a localização pelo IP.",
    };
  }
};

export default getLocationFromIP;
