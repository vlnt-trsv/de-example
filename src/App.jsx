import { Route, Routes } from "react-router-dom";

// Роуты
import Auth from "./modules/auth/Auth";
import Admin from "./modules/admin/Admin";
import Profile from "./modules/profile/Profile";
import Home from "./modules/home/Home";
import User from "./modules/profile/User/User";
import NewOrder from "./modules/profile/Order/NewOrder/NewOrder";
import AllOrder from "./modules/profile/Order/AllOrder/AllOrder";

// Приватный роут
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="auth" element={<Auth />} />

      <Route element={<PrivateRoutes />}>
        <Route path="admin" element={<Admin />} />

        <Route path="profile" element={<Profile />}>
          <Route path="newOrder" element={<NewOrder />} />
          <Route path="allOrder" element={<AllOrder />} />
          <Route path="user" element={<User />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
