import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RocketOutlinedIcon from "@mui/icons-material/RocketOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import "./navbar.css";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { currentUser, logoutHandler } = useContext(AuthContext);
  const isNavLinkActive = (match, location) => {
    return match;
  };
  return (
    <div className="navbar-container">
      <nav className="navbar-wrapper">
        <NavLink className="navlink" to="/" exact>
          <HomeOutlinedIcon />
          Home
        </NavLink>
        <NavLink className="navlink" to="/explore">
          <RocketOutlinedIcon style={{ fontWeight: "300" }} />
          Explore
        </NavLink>
        <NavLink className="navlink" to="/bookmarks">
          <BookmarkBorderOutlinedIcon style={{ fontWeight: "300" }} />
          Bookmarks
        </NavLink>
        <NavLink className="navlink" to={`/profile/${currentUser?.username}`}>
          <PermIdentityOutlinedIcon style={{ fontWeight: "300" }} />
          {currentUser?.username ? currentUser.username : "Profile"}
        </NavLink>

        <button onClick={logoutHandler} className="logout-btn">
          <LogoutIcon
            style={{
              color: "lightskyblue",
              fontSize: "14px",
            }}
          />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
