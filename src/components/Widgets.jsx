import React from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
// utils
import { SearchComp } from "../utils/SearchComp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TweepPhotos } from "./profile/media/TweepPhotos";
import { Avatar, Button, Paper } from "@mui/material";
import {
  TwitterShareButton,
  TwitterTimelineEmbed,
  TwitterTweetEmbed,
} from "react-twitter-embed";
// mui

const Widgets = () => {
  const { credentials, authUserTweets, authUserTweetsCount, tweeps } =
    useAuthContext();
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
          <div className="mt-3">
            <Paper elevation={2}>
              <div className="container py-3 ">
                <h4 className="mb-4">You might Like</h4>
                {tweeps.slice(0, 3).map((tweep) => (
                  <div className="tweeps-suggestions">
                    <div className="row p-2">
                      <div className="col-2">
                        <Avatar
                          src={profilePicsUrl + tweep.profile_picture}
                          className="shadow-sm mr-5 cursor-pointer"
                        />
                      </div>
                      <div className="col-7">
                        <h5>
                          {tweep.first_name} {tweep.last_name}
                        </h5>
                        <em>@{tweep.handle}</em>
                      </div>
                      <div className="col-2">
                        <Button className="followBtn text-white" fullWidth>
                          Follow
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Paper>
          </div>
        </>
      )}

      <div className="widgets__widgetContainer mt-3">
        <h2 className="mb-2">What's happening</h2>
        {/* <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            No one knows when they begin, ideas don&#39;t come out fully formed,
            they only become clearer as you work on them. You just have to get
            started.
          </p>
          &mdash; David Chibueze 👨🏻‍💻 (@davydocsurg){" "}
          <a href="https://twitter.com/davydocsurg/status/1374156837323481092?ref_src=twsrc%5Etfw">
            March 23, 2021
          </a>
        </blockquote>{" "} */}
        {/* <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script> */}
        {/* <TwitterTimelineEmbed
          sourceType="profile"
          // The preferred screen name goes next:
          screenName="WHO"
          // Style options goes here:
          options={{ height: 600 }}
        /> */}
        <TwitterTweetEmbed tweetId={"1374156837323481092"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="davydocsurg"
          options={{ height: 600 }}
        />
        <TwitterShareButton
          url={"https://facebook.com/davydocsurg"}
          options={{ text: "#reactjs is awesome", via: "davydocsurg" }}
        />
      </div>
    </div>
  );
};

export default Widgets;
