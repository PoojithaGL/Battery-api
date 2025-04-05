import { createContext, useState } from "react";

export const BatteryContext = createContext();

export const BatteryProvider = ({ children }) => {
  const [battery, setBattery] = useState(0);
  const [charging, setCharging] = useState("");

  const setBatteryLevel = (batteryLevel) =>{
    setBattery((batteryLevel * 100).toFixed(2));
  }

  async function onFetch() {
    try {
      const batteryLevel = await navigator.getBattery();
      setBatteryLevel(batteryLevel.level);

      batteryLevel.onchargingchange = (event) => {
        setCharging(event.currentTarget.charging);
      };
      batteryLevel.onlevelchange = (event) => {
        setBatteryLevel(event.currentTarget.level);
      };
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <BatteryContext.Provider value={{ battery, charging, onFetch }}>
      {children}
    </BatteryContext.Provider>
  );
};
