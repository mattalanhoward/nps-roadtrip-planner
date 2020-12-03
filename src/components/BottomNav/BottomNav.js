import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./BottomNav.css";

const TopNav = () => {
  return (
    <div className="bottom-nav-container">
      <div className="logo-title">
        <p>Logo</p>
        <h3>National Park Road Trip Planner</h3>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default TopNav;
