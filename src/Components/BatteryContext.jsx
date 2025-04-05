import { createContext, useState} from "react";

export const BatteryContext = createContext();

export const BatteryProvider = ({ children }) => {
  const [battery, setBattery] = useState(0);
  const [charging,setCharging] = useState('');
  const [alarm, setAlarm] = useState(false);

  async function onFetch() {
    try {
        const batteryLevel = await navigator.getBattery(); 
        console.log("battery",batteryLevel);
        setBattery(batteryLevel.level);
        
       batteryLevel.onchargingchange = (event) =>{
         setCharging(event.currentTarget.charging)
         if(event.currentTarget.charging)
          {
          console.log("It is Charging");
        }else{
        console.log("It is not Charging");
        }
      }
      batteryLevel.onlevelchange = (event) =>{
    setBattery(event.currentTarget.level);
      }


      batteryLevel.onlevelchange = (event) => {
        const newLevel = event.currentTarget.level;
        setBattery(newLevel);

       if (newLevel === 0.62){
        browser.alarms.create("batteryAlaram");
        console.log("Alaram set");
        setAlarm(true)
       }else{
        // console.log("Alaram Not set");
       }

      browser.alarms.get((alarms) => {
        console.log("Alaram", alarms);
      });

    }

    } catch (error) {
        console.error(error);
    }
    console.log(battery)
}


  return (
    <BatteryContext.Provider value={{battery,charging,onFetch}}>
      {children}
    </BatteryContext.Provider>
  );
};

