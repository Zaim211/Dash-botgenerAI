import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./Auth/SingIn";
import SignUp from "./Auth/SignUp";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { ToggleProvider } from "./components/store/ToggleContext";
import Leads from "./pages/Leads";
import Layout from "./Layout";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <ToggleProvider>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* `index` for Home to display only at `/` */}
            <Route index element={<Home />} />
            {/* Route for Leads at `/leads` */}
            <Route path="leads" element={<Leads />} />
          </Route>
          {/* Separate routes for authentication */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </UserContextProvider>
    </ToggleProvider>
  );
}

export default App;
