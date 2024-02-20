// src/utils/fingerprinting.ts

import { ClientJS } from "clientjs";
export { getLocationFromNavigator, getLocationFromIP } from "./geolocation";

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
