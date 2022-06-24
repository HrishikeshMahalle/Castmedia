import React from "react";
import "./sidebar.css";
import { BiHomeAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const sidebarItem = ({ isActive }) => {
    return {
      fontSize: "2rem",
      textAlign: "center",
      padding: "0.5rem",
      backgroundColor: "white",
      color: isActive ? "red" : "",
    };
  };
  return (
    <nav className="sidebar">
      <NavLink style={sidebarItem} to="/">
        <BiHomeAlt />
      </NavLink>

      <NavLink style={sidebarItem} to="/profile">
        <CgProfile />
      </NavLink>
    </nav>
  );
}
