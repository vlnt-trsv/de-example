import { Route, Routes } from "react-router-dom";
import Auth from "./modules/auth/Auth";
import Admin from "./modules/admin/Admin";
import Profile from "./modules/profile/Profile";
import Main from "./modules/main/Main";
import NewRequest from "./modules/profile/Request/NewRequest";
import User from "./modules/profile/User/User";

function App() {
  return (
    <Routes>
      <Route index element={<Main />} />

      <Route path="auth" element={<Auth />} />
      <Route path="admin" element={<Admin />} />
      <Route path="profile" element={<Profile />}>
        <Route path="request" element={<NewRequest />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
}

export default App;
