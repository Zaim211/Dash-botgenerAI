import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./Auth/SingIn";
import SignUp from "./Auth/SignUp";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { ToggleProvider } from "./components/store/ToggleContext";
import Leads from "./pages/Leads";
import Layout from "./Layout";
import Programmes from "./pages/Programmes";
import Entreprise from "./pages/Entreprise";
import CreateBannières from "./pages/CreateBannières";
import LeadDetailsPage from "./pages/LeadDetailsPage";
import Banner from "./pages/Banner";
import MagicSms from "./pages/MagicSms";
import Setting from "./pages/Setting";
import CommentairePage from "./pages/CommentairePage";
import AffectuerLead from "./pages/AffectuerLead";
import CommerciauxPage from "./pages/CommerciauxPage";
import ListLeads from "./pages/Commercial/ListLeads";

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
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/entreprise" element={<Entreprise />} />
            <Route path="/bannières" element={<Banner />} />
            <Route path="/create-bannières" element={<CreateBannières />} />
            <Route path="/create-bannières/:id" element={<CreateBannières />} />
            {/* <Route path="/lead/:id" element={<LeadDetailsPage />}/> */}
            <Route path="/affect-leads" element={<AffectuerLead />} />
            <Route path="/commerciaux" element={<CommerciauxPage />} />
            <Route path="/list-leads" element={<ListLeads />} />
            <Route path="/magic-sms" element={<MagicSms />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/lead/:id" element={<LeadDetailsPage />}>
              <Route path="" element={<LeadDetailsPage />} />{" "}
              {/* Default Tab */}
              <Route path="commentaires" element={<CommentairePage />} />
            </Route>
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
