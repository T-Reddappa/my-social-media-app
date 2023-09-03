import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <div className="header-wrapper">
        <p onClick={() => navigate("/")}>
          <span className="logo">my</span>
          <span style={{ fontSize: "22px", fontWeight: "400" }}>Converse</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
