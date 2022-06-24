import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import Header from "../../Utilities/Header/header";
import Sidebar from "../../Utilities/Sidebar/sidebar";

export const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate()

  const handleLogout=()=>{
      auth.logout()
      navigate('/')
  }
  return (
    <div>
      <div className="app">
        <div className="container">
          <Header />
          <Sidebar />
          <div className="main-content">
          <h1>Login Route</h1>
              Welcome {auth.user}
              <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
