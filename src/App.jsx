import "./App.css";
import LandingForm from "./components/LandingForm";
import {LandingPage} from './components/LandingPage';

function App() {
  return (
    <>
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
