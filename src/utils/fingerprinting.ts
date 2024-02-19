// src/utils/fingerprinting.ts

import { ClientJS } from "clientjs";

export const getFingerprintingData = async (): Promise<Record<string, any>> => {
  const client = new ClientJS();

  // Coleta de dados de impressão digital
  const fingerprintingData: Record<string, any> = {
    userAgent: client.getUserAgent(),
    browser: {
      name: client.getBrowser(),
      version: client.getBrowserVersion(),
      majorVersion: client.getBrowserMajorVersion(),
    },
    engine: {
      name: client.getEngine(),
      version: client.getEngineVersion(),
    },
    os: {
      name: client.getOS(),
      version: client.getOSVersion(),
    },
    device: {
      type: client.getDeviceType(),
      vendor: client.getDeviceVendor(),
      isMobile: client.isMobile(),
    },
    screen: {
      print: client.getScreenPrint(),
      resolution: client.getCurrentResolution(),
      colorDepth: client.getColorDepth(),
      availableResolution: client.getAvailableResolution(),
    },
    plugins: client.getPlugins(),
    fonts: client.getFonts(),
    timezone: client.getTimeZone(),
    language: {
      browserLanguage: client.getLanguage(),
      systemLanguage: client.getSystemLanguage(),
      userLanguage: client.getLanguage(),
    },
  };

  return fingerprintingData;
};

export const getLocationFromNavigator = async (): Promise<
  Record<string, any>
> => {
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

export const getLocationFromIP = async (): Promise<Record<string, any>> => {
  try {
    const response = await fetch("https://ipapi.co/json/");
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
