import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

const TopNav = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default TopNav;
