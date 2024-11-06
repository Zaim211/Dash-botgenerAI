import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import SideBar from "./components/Sidebar";


export default function Layout() {
  const { isLoggedIn } = useContext(UserContext);


  if (!isLoggedIn()) {
    return <Navigate to="/SignIn" replace />;
  }

  return (
    <div className="flex  bg-gray-200 h-full w-full">
     
      <SideBar />
    
      <main className="flex-1 p-4 bg-gray-200">
      <Outlet />
      </main>
    </div>
  );
}
