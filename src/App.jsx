import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800">Hello from Solar App!</h1>
    </div>
    </>
  )
}

export default App
