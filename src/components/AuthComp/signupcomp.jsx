import React, { useCallback, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

import { setAuthData } from "../../Utilities/AuthUtil/authUtil";
import { useAuth } from "../../Context/authcontext";
import Header from "../../Utilities/Header/header";
import Sidebar from "../../Utilities/Sidebar/sidebar";
import "../AuthComp/styles/signup.css";

// import "../styles/Auth.css";

const Signup = () => {
  const [goto, setGoto] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { dispatch } = useAuth();

  const { username, email, password, confirmPassword } = credentials;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  });

  const sendReq = async (data) => {
    try {
      const res = await axios.post("/api/auth/signup", data);
      setAuthData(res.data.encodedToken);
      return res;
    } catch (err) {
      if (err.response.status === 422) {
        console.log("userAlready Exist");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      sendReq({
        username,
        email,
        password,
      }).then((res) => {
        dispatch({
          type: "SIGNED_UP",
          payload: res === undefined ? false : true,
        });
        setGoto(res === undefined ? false : true);
      });
    } else {
      console.log("wrong password");
      setCredentials({ ...credentials, password: "", confirmPassword: "" });
    }
  };

  if (goto) {
    return <Navigate to="/" />;
  }
  console.log("Checkking cred", credentials);
  return (
    <>
      <div className="app">
        <div className="container">
          <Header />
          <Sidebar />
          <div className="signup-content">
            <div className="auth">
              <div className="auth-container">
                <form onSubmit={handleSubmit}>
                  <h2>Register</h2>
                  <div className="username">
                    <label className="label" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="inputbox"
                      type="text"
                      placeholder="Enter username..."
                      name="username"
                      value={username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="email">
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="inputbox"
                      type="email"
                      placeholder="Enter email..."
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="password">
                    <label className="label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="inputbox"
                      type="password"
                      placeholder="Enter password..."
                      name="password"
                      value={password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="confirm-password">
                    <label className="label" htmlFor="password">
                      Confirm Password
                    </label>
                    <input
                      className="inputbox"
                      type="password"
                      placeholder="Enter password again..."
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="register-button">
                    Register
                  </button>
                  <div className="already-text">
                    <span>Already have an account,</span>
                    <Link to="/login">login here</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
