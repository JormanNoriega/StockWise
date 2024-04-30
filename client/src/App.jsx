import { useState } from 'react'
import './App.css'
import { Prueba } from './components/Prueba'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Prueba text="GUARDAR"/>
    </>
  )
}

export default App
