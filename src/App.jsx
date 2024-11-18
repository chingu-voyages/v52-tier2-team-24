import { useState } from "react";
import "./App.css";
import LandingForm from "./components/LandingForm";
import {LandingPage} from './components/LandingPage';
import {LandingPageOriginal} from './components/LandingPageOriginal';

function App() {
  const [newLayout, setNewLayout] = useState(false);

  return (
    <>
      <button 
        className='absolute right-10 bottom-10 border-black'
        onClick={() => newLayout ? setNewLayout(false) : setNewLayout(true)}
      >{newLayout ? 'View OG Layout' : 'View Layout V2'}</button>
      {/* <div className="min-h-screen bg-blue-100 flex justify-center items-center"> */}
      <div>
        {/* <h1 className="text-4xl font-bold text-gray-800">Hello from Solar App!</h1> */}
        <LandingPage />
        {/* <LandingForm /> */}
      </div>
    </>
  );
}

export default App;
