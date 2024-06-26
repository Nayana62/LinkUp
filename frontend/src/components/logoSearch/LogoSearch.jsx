import React from "react";
import Logo from "../../img/logo.png";
import "./LogoSearch.css";

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="logo" />
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
