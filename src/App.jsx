import { Route, Routes } from "react-router-dom";
import Auth from "./modules/auth/Auth";
import Admin from "./modules/admin/Admin";
import Profile from "./modules/profile/Profile";
import Home from "./modules/home/Home";
import NewRequest from "./modules/profile/Request/NewRequest";
import User from "./modules/profile/User/User";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="auth" element={<Auth />} />

      <Route element={<PrivateRoutes />}>
        <Route path="admin" element={<Admin />} />

        <Route path="profile" element={<Profile />}>
          <Route path="request" element={<NewRequest />} />
          <Route path="user" element={<User />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
