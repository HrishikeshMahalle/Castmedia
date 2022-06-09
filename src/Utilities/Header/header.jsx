import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import "./header.css";

export default function Header() {
  const auth = useAuth();
  console.log("From Header", auth.user);
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
          <div className="icon-items">SignIN Dots</div>
          <div className="icon-items">
            {!auth.user && <NavLink to="/login">Login</NavLink>}
          </div>
        </div>
      </div>
    </>
  );
}
