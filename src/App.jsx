import "./App.css";
import { LandingPage } from "./components/LandingPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import GooglePlacesAutocomplete from "./components/customInputs/AutoForm";

function App() {
  return (
    // <GooglePlacesAutocomplete />
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
