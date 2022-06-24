import "./App.css";
import Explore from "./components/Explore/explore";
import { Home } from "./components/Home/home";
import { Routes, Route } from "react-router-dom";
import { Profile } from "./components/Profile/profile";
import { AuthProvider } from "./Context/auth";
import { Login } from "./Context/login";
import { RequireAuth } from "./Context/RequireAuth";
import { Logincomp } from "./components/AuthComp/logincomp";
import Signup from "./components/AuthComp/signupcomp";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/video/:id"
            element={
              <RequireAuth>
                <Explore />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Logincomp />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login2" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
