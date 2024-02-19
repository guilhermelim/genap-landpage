import { useEffect } from "react";

export interface FingerprintComponentProps {
  setFingerprintData: React.Dispatch<React.SetStateAction<any>>;
}

const FingerprintComponent: React.FC<FingerprintComponentProps> = ({
  setFingerprintData,
}) => {
  const updateFingerprinting = async () => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const { getFingerprintingData } = await import(
          "@/utils/fingerprinting"
        );

        const fingerprint = await getFingerprintingData();
        setFingerprintData((prevFingerprintData: any) => ({
          ...prevFingerprintData,
          ...fingerprint,
        }));
      }
    };

    fetchData();
  };

  const updateLocationFromNavigator = async () => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const { getLocationFromNavigator } = await import(
          "@/utils/fingerprinting"
        );

        try {
          const location = await getLocationFromNavigator();
          setFingerprintData((prevData: any) => ({ ...prevData, location }));
        } catch (error) {
          console.error("Erro ao obter a localização do usuário:", error);
        }
      }
    };

    fetchData();
  };

  const updateLocationFromIP = async () => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const { getLocationFromIP } = await import("@/utils/fingerprinting");

        try {
          const ipLocation = await getLocationFromIP();
          setFingerprintData((prevData: any) => ({ ...prevData, ipLocation }));
        } catch (error) {
          console.error("Erro ao obter a localização por IP:", error);
        }
      }
    };

    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      Promise.all([
        updateFingerprinting(),
        updateLocationFromNavigator(),
        updateLocationFromIP(),
      ]);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // Este componente não renderiza nada visualmente
};

export default FingerprintComponent;
