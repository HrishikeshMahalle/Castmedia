import "./App.css";
import Explore from "./components/Explore/explore";
import { Home } from "./components/Home/home";
import { Routes, Route } from "react-router-dom";
import { Profile } from "./components/Profile/profile";
import { AuthProvider } from "./Context/auth";
import { Login } from "./Context/login";
import { RequireAuth } from "./Context/RequireAuth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Explore />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
