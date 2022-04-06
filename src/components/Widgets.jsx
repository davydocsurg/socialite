import React from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
// utils
import { SearchComp } from "../utils/SearchComp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TweepPhotos } from "./profile/media/TweepPhotos";
// mui

const Widgets = () => {
  const { credentials, authUserTweets, authUserTweetsCount } = useAuthContext();
  const location = useLocation();
  const profilePicsUrl = "http://localhost:8000/profile/photos/";
  const tweepPhotoUrl = "http://localhost:8000/tweets/photos/";
  let handle = credentials.handle;
  let authTweepPhotos = authUserTweets.tweet_photo;

  return (
    <div className="widgets mt-2">
      <SearchComp />
      {location.pathname.match(`${handle}`) && authUserTweetsCount > 0 && (
        <>
          <div className="container mt-3">
            <TweepPhotos
              authTweepPhotos={authTweepPhotos}
              authUserTweets={authUserTweets}
              authUserTweetsCount={authUserTweetsCount}
              profilePicsUrl={profilePicsUrl}
              tweepPhotoUrl={tweepPhotoUrl}
              handle={handle}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Widgets;
