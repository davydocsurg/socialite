import React from "react";
import GoBack from "../constants/GoBack";

const Explore = () => {
  return (
    <div className="explore text-left">
      <div className="explore__header row">
        <div className="col-1">
          <GoBack></GoBack>
        </div>
        <div className="col-4">
          <h2 className="ml-4">Explore</h2>
        </div>
      </div>
    </div>
  );
};

export default Explore;
