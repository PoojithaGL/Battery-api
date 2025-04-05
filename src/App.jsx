import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Battery from './Components/Battery'
import { BatteryProvider } from './Components/BatteryContext'

function App() {
 

  return (
    <BatteryProvider>
      <Battery/>
    </BatteryProvider>
  )
}

export default App
