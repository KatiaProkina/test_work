import React from "react";

const Header = ({ handleInputChange, username }) => (
  <header className="header">
    <div>
      <img src="../public/github.png" alt="" className="logo" />
    </div>
    <div className="search-div">
      <img src="../public/search_icon.png" alt="" className="search_icon" />
      <input
        value={username}
        onChange={handleInputChange}
        placeholder="Enter GitHub username"
        className="input_search"
      />
    </div>
  </header>
);

export default Header;
