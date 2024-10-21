import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col h-full w-full">
     
      <main className="flex-1 w-full h-full">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};
