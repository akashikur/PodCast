import React from "react";

import { NavLink } from "react-router-dom";
import "./style.css";
const Header = () => {
  // const location = useLocation();
  // const currentpath = location.pathname;
  return (
    <div className="nav-bar">
      <div className="gradient"></div>
      <div className="links">
        <NavLink to="/">SignUp</NavLink>
        <NavLink to="/podcasts">Potcasts</NavLink>
        <NavLink to="/createaprodcast">Start A Podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </div>
  );
};

export default Header;
