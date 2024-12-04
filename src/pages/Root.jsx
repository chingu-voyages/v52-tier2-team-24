import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar.jsx";
import Footer from "./Footer.jsx";

export default function RootLayout() {
    return (
      //Admin Route
      <div className="min-h-screen bg-white">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer/>
      </div>
    );
  }