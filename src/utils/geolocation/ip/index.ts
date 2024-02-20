import { default as ipapi } from "./ipapi";
import { default as ip2location } from "./ip2location";

const getLocationFromIP = async (): Promise<Record<string, any>> => {
  try {
    const dataIPapi = await ipapi();
    const dataIP2Location = await ip2location();

    if (!dataIPapi.error) {
      return dataIPapi;
    }

    if (!dataIP2Location.error) {
      return dataIPapi;
    }
    return {
      latitude: 0,
      longitude: 0,
      error: true,
    };
  } catch (error) {
    return {
      latitude: 0,
      longitude: 0,
      error: true,
    };
  }
};

export default getLocationFromIP;
