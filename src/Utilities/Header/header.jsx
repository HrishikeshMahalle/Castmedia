import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/authcontext";
import "./header.css";

export default function Header() {
  const auth = useAuth();
  console.log("From Header", auth.isUser);
  return (
    <>
      <div className="header">
        <div className="header-title">
          <span>Cast Media</span>
        </div>
        <div className="header-nav-items">
          <input
            type="text"
            placeholder="Search Movies, Funny Videos, Gaming Stuff"
          />
        </div>
        <div className="header-icons">
          <div className="icon-items">
            {!auth.isUser && <NavLink to="/signup">Signup</NavLink>}
          </div>
          <div className="icon-items">
            {!auth.isUser ? <NavLink to="/login">Login</NavLink> : "IN"}
          </div>
        </div>
      </div>
    </>
  );
}
