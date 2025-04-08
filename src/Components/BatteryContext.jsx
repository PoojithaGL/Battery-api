import { createContext, useReducer } from "react";

export const BatteryContext = createContext();
 const batteryReducer = (state,action) => {
switch(action.type){
  case "SET_BATTERYLEVEL":
    return{...state,battery:action.payload};
  case "SET_CHARGINGLEVEL":
    return{...state,charging:action.payload};
    default:
      return state;
}
};
const initialState = {
  battery: "0",
  charging :""
}

export const BatteryProvider = ({ children }) => {
  
    const [state,dispatch]= useReducer(batteryReducer,initialState);
  // const [battery, setBattery] = useState(0);
  // const [charging, setCharging] = useState("");

  // const setBatteryLevel = (batteryLevel) =>{
    // setBattery((batteryLevel * 100).toFixed(2));
 

  async function onFetch() {
    try {
      const batteryLevel = await navigator.getBattery();
      // setBatteryLevel(batteryLevel.level);
      dispatch({
        type: "SET_BATTERYLEVEL",
        payload: (batteryLevel.level * 100).toFixed(2),
      });
      
      dispatch({
        type: "SET_CHARGINGLEVEL",
        payload: batteryLevel.charging,
      });
    


      batteryLevel.onchargingchange = (event) => {
        // setCharging(event.currentTarget.charging);
        dispatch({type:"SET_CHARGINGLEVEL",payload: event.currentTarget.charging})
      };

      batteryLevel.onlevelchange = (event) => {
        // setBatteryLevel(event.currentTarget.level);
        dispatch({type:"SET_BATTERYLEVEL",payload: event.currentTarget.level})
      };

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <BatteryContext.Provider value={{ battery:state.battery, charging:state.charging, onFetch}}>
      {children}
    </BatteryContext.Provider>
  );
};

export default BatteryContext;




























