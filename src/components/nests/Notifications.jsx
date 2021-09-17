import React from "react";
import GoBack from "../constants/GoBack";

const Notifications = () => {
  return (
    <div className="notifications text-left">
      <div className="notifications__header row">
        <div className="col-1">
          <GoBack></GoBack>
        </div>
        <div className="col-4">
          <h2 className="ml-4">Notifications</h2>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
