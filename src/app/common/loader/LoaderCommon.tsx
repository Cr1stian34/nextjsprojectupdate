import React from "react";
import "./../../styles/loaderstyle.css";

const LoaderCommon = () => {
  return (
    <div className="w-full h-[100vh] bg-black flex justify-center items-center">
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderCommon;
