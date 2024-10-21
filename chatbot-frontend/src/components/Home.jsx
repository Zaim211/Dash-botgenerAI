import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardCards from "./DashboardCard";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : "";
  const user = decodedToken ? decodedToken.user : {};

  const handleSignOut = () => {
    // Logic for signing out (e.g., clearing tokens, redirecting to login page)
    setIsAuthenticated(false);
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-2 border rounded-sm border-black">
        {/* Pass props to Navbar */}
        <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          onSignOut={handleSignOut}
        />
        <div className="flex justify-center mt-4">
          <div
            className="border-b border-gray-300"
            style={{ width: "96%", height: "1px" }}
          ></div>
        </div>

        <div className="p-6 bg-white min-h-screen">
          <h2 className="text-2xl font-bold">Overview</h2>
          <DashboardCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
