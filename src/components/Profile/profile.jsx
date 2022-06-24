import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authcontext";
import { GlobalContext } from "../../Context/GlobalState";
import Header from "../../Utilities/Header/header";
import Sidebar from "../../Utilities/Sidebar/sidebar";
import { Sectionbar } from "../../Utilities/SectionBar/sectionbar";
import "./style.css";
import jwt_decode from "jwt-decode";
import { users } from "../../backend/db/users";
import { removeAuthData } from "../../Utilities/AuthUtil/authUtil";

export const Profile = () => {
  const [userInfo, setUserInfo] = useState("");
  const [liked, setLiked] = useState([]);
  const [history, setHistory] = useState([]);
  const [watchlater, setWatchlater] = useState([]);
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const { encodedToken } = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/user/likes", {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        });
        setLiked(response.data.likes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/user/watchlater", {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        });
        setWatchlater(response.data.watchlater);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/user/history", {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },
        });
        setHistory(response.data.history);
      } catch (err) {
        console.log(err);
      }
    })();
    const decodedToken = jwt_decode(
      encodedToken,
      process.env.REACT_APP_JWT_SECRET
    );
    const user = users.filter((user) => user.email === decodedToken.email);
    setUserInfo(user[0].firstName);
  }, []);

  const handleLogout = () => {
    removeAuthData();
    console.log("Remove auth data");
    dispatch({ type: "LOGGED_OUT", payload: "" });
    navigate("/");
  };
  // const requireUser = (entc) => {
  //   const decodedToken = jwt_decode(entc, process.env.REACT_APP_JWT_SECRET);
  //   const user = users.filter(user=>user.email === decodedToken.email);
  //   return user[0].firstName;
  // };
  //  const userName = requireUser(encodedToken);
  return (
    <div>
      <div className="app">
        <div className="container">
          <Header />
          <Sidebar />
          <div className="profile-cont">
            <h1>Account Page</h1>
            Welcome {userInfo}
            <button onClick={handleLogout}>Logout</button>
            <Sectionbar
              title="Liked"
              subTitle="Videos you liked"
              items={liked}
            />
            {console.log(liked)}
            <Sectionbar
              title="History"
              subTitle="Your History"
              items={history}
            />
            <Sectionbar
              title="Watch Later"
              subTitle="Yeah watch Later"
              items={watchlater}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
