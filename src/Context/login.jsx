import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import Header from "../Utilities/Header/header";
import Sidebar from "../Utilities/Sidebar/sidebar";

export const Login = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //really Awesome Code path should learn more about this
  const redirectPath = location.state?.path || "/";

  const handleLogin = () => {
    auth.login(user);
    navigate(redirectPath, { replace: true });
  };


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const obj = []

  const handleForm = (e) => {
    e.preventDefault();
    console.log(user);
    setUsers(users => [...users,{user}])
    obj.push(user)
    console.log(users)
    console.log(obj)
    localStorage.setItem("user", JSON.stringify(obj));
  };
  return (
    <div>
      <div className="app">
        <div className="container">
          <Header />
          <Sidebar />
          <div className="main-content">
            <h1>Login Route</h1>
            <form onSubmit={handleForm}>
              <label style={{ fontSize: "2rem" }}>
                UserName:{" "}
                <input
                  type="text"
                  name="username"
                  value={user.username || ""}
                  onChange={handleChange}
                />
              </label>
              <label style={{ fontSize: "2rem" }}>
                Password:{" "}
                <input
                  type="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                />
              </label>
              <button style={{ borderColor: "red" }} onClick={handleLogin}>
                Login
              </button>
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
