import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Layout() {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn()) {
    return <Navigate to="/SignIn" replace />;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <main className="flex-1 w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
