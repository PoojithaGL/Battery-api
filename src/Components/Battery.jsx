import React, { useContext } from 'react'
import "./Battery.css"
import  BatteryContext  from './BatteryContext';

const Battery = () => {
    const{battery,charging,onFetch} = useContext(BatteryContext);
     return (
    <div> 
       <h3>BATTERY LEVEL</h3>
      <h3>{battery}%</h3>
      <h3>{charging ? "Device is Charging" : "Device is not Charging"}</h3>
       
    <div className='BatteryContainer'>
      <button className='battery' onClick={onFetch}> Battery %</button>
      
        </div>
    </div>
  )
}

export default Battery
