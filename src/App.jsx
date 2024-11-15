import "./App.css";
import LandingForm from "./components/LandingForm";
import TestValidate from "./components/TestValidate";

function App() {
  return (
    <>
      <div className="min-h-screen bg-blue-100 flex justify-center items-center">
        {/* <h1 className="text-4xl font-bold text-gray-800">Hello from Solar App!</h1> */}
        <div className="flex gap-4">
          <LandingForm />
          <TestValidate />
        </div>
      </div>
    </>
  );
}

export default App;
