import React from "react";
import GoBack from "../constants/GoBack";

const TweetDetails = () => {
  return (
    <div className="singleTweet text-left">
      <div className="singleTweet__header row">
        <div className="col-1">
          <GoBack></GoBack>
        </div>
        <div className="col-4">
          <h2 className="ml-4">Tweet</h2>
        </div>
      </div>
    </div>
  );
};

export default TweetDetails;
