import React, { useCallback, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { setAuthData } from "../../Utilities/AuthUtil/authUtil";
import { useAuth } from "../../Context/authcontext";
import Header from "../../Utilities/Header/header";
import Sidebar from "../../Utilities/Sidebar/sidebar";
import "../AuthComp/styles/login.css";

export const Logincomp = () => {
  const [goto, setGoto] = useState(false);
  const [credentials, setCredentials] = useState(false);
  const { dispatch, isUser } = useAuth();

  const { email, password } = credentials;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  });

  const sendReq = async (body) => {
    try {
      const response = await axios.post("/api/auth/login", body);
      setAuthData(response.data.encodedToken);
      return response.data.encodedToken;
    } catch (err) {
      if (err.response.status === 404) {
        console.log("NOt working");
      }
      if (err.response.status === 401) {
        console.log("NOt working");
      }
    }
  };

  console.log("Checkking isUser", credentials);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("data sending to Send Req");
    sendReq({
      email,
      password,
    }).then((res) => {
      dispatch({
        type: "LOGGED_IN",
        payload: res === undefined ? null : res,
      });
      setGoto(res === undefined ? false : true);
      console.log("logged in successfully", goto, res === undefined);
    });
  };
  const testUser = () => {
    console.log("Test dataa sending");
    sendReq({
      email: "adarshbalika@gmail.com",
      password: "adarshBalika123",
    }).then((res) => {
      dispatch({
        type: "LOGGED_IN",
        payload: res === undefined ? null : res,
      });
      setGoto(res === undefined ? false : true);
      console.log("logged in successfully", goto, res === undefined);
    });
  };
  if (goto) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="app">
        <div className="container">
          <Header />
          <Sidebar />
          <div className="login-content">
            <div className="auth">
              <div className="auth-container">
                <form onSubmit={submitHandler}>
                  <h3>Login</h3>
                  <div className="email">
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="inputbox"
                      type="email"
                      placeholder="Add Your mail"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                    <div className="password">
                      <label className="label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="inputbox"
                        placeholder="Enter Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                      />
                      <button className="btn-container" type="submit">
                        Submit
                      </button>
                      <button className="btn-container" onClick={testUser}>
                        Login with dummy user
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
