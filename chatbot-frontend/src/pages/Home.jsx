import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCard";
import { jwtDecode } from "jwt-decode";


const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : "";
  const user = decodedToken ? decodedToken.user : {};

  const handleSignOut = () => {
    // Logic for signing out (e.g., clearing tokens, redirecting to login page)
    setIsAuthenticated(false);
  };
  return (
    <div className="flex-1 px-4">
       <div className="mb-12">
       <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          onSignOut={handleSignOut}
        />
       </div>
      {/* Main content */}
      <div className="flex-1  border rounded-sm">
        {/* Pass props to Navbar */}
       
        <div className="p-4 rounded-md bg-white ">
          <h2 className="text-2xl font-bold">Overview</h2>
          <DashboardCards />
        </div> 
      </div>
    </div>
  );
};

export default Home;
