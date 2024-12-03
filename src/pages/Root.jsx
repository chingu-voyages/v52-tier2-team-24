import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar.jsx";
import Footer from "./Footer.jsx";

export default function RootLayout() {
    return (
      // This is the admin section
      <div className="min-h-screen bg-white">
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer/>
      </div>
    );
  }