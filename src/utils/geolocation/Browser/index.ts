const getLocationFromNavigator = async (): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject("Geolocalização não suportada pelo navegador.");
    }
  });
};

export default getLocationFromNavigator;
