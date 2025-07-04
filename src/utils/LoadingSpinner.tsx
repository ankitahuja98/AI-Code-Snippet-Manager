import React from "react";
import AILoader from "../images/AILoader.gif";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{ backgroundColor: "rgb(136 136 136 / 38%)" }}
    >
      <img
        src={AILoader}
        alt="Loading..."
        className="w-40 h-40"
        style={{ borderRadius: "30px" }}
      />
    </div>
  );
};

export default LoadingSpinner;
