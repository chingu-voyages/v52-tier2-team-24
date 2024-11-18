import { useState } from "react";
import "./App.css";
import {LandingPage} from './components/LandingPage';
import {LandingPageOriginal} from './components/LandingPageOriginal';

function App() {
  const [newLayout, setNewLayout] = useState(false);

  return (
    <>
      <button 
        className='fixed right-10 bottom-10 border-black bg-orange-100 p-5 rounded-xl'
        onClick={() => newLayout ? setNewLayout(false) : setNewLayout(true)}
      >{newLayout ? 'View OG Layout' : 'View Layout V2'}</button>

       {newLayout ?
        <LandingPage />
        :
        <LandingPageOriginal />
      }
    </>
  );
}

export default App;
