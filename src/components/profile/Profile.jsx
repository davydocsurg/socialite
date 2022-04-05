import { Avatar, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { GoBack } from "../../utils/baseIcons/ProfileIcons";
import { Card } from "./Card";

const Profile = () => {
  const { credentials, authUserTweetsCount, GetAuthUserData } =
    useAuthContext();

  let fullName = credentials.first_name + " " + credentials.last_name + " ";

  return (
    <>
      <div className="profile">
        <div className="text-left profile__header">
          <div className=" row">
            <GoBack></GoBack>
            {"  "}
            <div className="col-4">
              <h2 className="ml-5">{fullName}</h2>
              <em className="font-weight-lighter">
                {authUserTweetsCount < 1 ? "No" : authUserTweetsCount}{" "}
                {authUserTweetsCount > 1 ? "Tweets" : "Tweet"}
              </em>
            </div>
          </div>
        </div>

        {/* loading UI */}
        {/* {UI.loading && (
          <div className="mb-auto mt-5 text-center mx-auto text-twitter-color">
            <i className="spinner-border spinner-border-md "></i>
          </div>
        )} */}

        {/* <FlipMove>
          {authUserTweets.length > 0 ? (
            authUserTweets.map((authUserTweet) => (
              <AuthUserTweet
                key={authUserTweet.slug}
                slug={authUserTweet.slug}
                tweepName={first_name + " " + last_name}
                username={handle}
                verified={true}
                text={authUserTweet.tweet_text}
                tweetTime={authUserTweet.created_at}
                avatar={profilePicsUrl + profile_picture}
                tweetImage={
                  authUserTweet.tweet_photo
                    ? "http://localhost:8000/tweets/photos/" +
                      authUserTweet.tweet_photo
                    : null
                }
                likesCount={authUserTweet.likes.length}
                authUserId={id}
                tweepLikeId={authUserTweet.likes.map((l) => l.user_id)}
              ></AuthUserTweet>
            ))
          ) : (
            <div className="text-center text-black mt-5 mx-auto">
              <h2>No Tweets Found</h2>
            </div>
          )}
        </FlipMove> */}
        <Card />
      </div>
    </>
  );
};

export default Profile;
