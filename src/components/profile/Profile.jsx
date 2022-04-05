import { Avatar, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTweetContext } from "../../contexts/TweetContext";
import { GoBack } from "../../utils/baseIcons/ProfileIcons";
import { AuthUserTweets } from "./AuthUserTweets";
import { Card } from "./Card";
import FlipMove from "react-flip-move";

const Profile = () => {
  const {
    credentials,
    authUserTweetsCount,
    authUserTweets,
    GetAuthUserData,
    loading,
    authenticated,
  } = useAuthContext();

  // const {loading, }=useTweetContext()
  const tweetPicsURL = "http://localhost:8000/tweets/photos/";
  const profilePicsUrl = "http://localhost:8000/profile/photos/";
  const coverPicsUrl = "http://localhost:8000/profile/photos/";

  let fullName = credentials.first_name + " " + credentials.last_name + " ";
  let authAvatar = credentials.profile_picture;

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
        <Card profilePicsUrl={profilePicsUrl} coverPicsUrl={coverPicsUrl} />

        {/* loading UI */}
        {loading && (
          <div className="mb-auto mt-5 text-center mx-auto text-twitter-color">
            <i className="spinner-border spinner-border-md "></i>
          </div>
        )}

        <>
          {authUserTweets.length > 0 ? (
            authUserTweets.map((authUserTweet) => (
              <AuthUserTweets
                key={authUserTweet.slug}
                authenticated={authenticated}
                slug={authUserTweet.slug}
                tweepName={fullName}
                username={authUserTweet.handle}
                verified={true}
                text={authUserTweet.tweet_text}
                tweetTime={authUserTweet.created_at}
                avatar={profilePicsUrl + authAvatar}
                tweetImage={
                  authUserTweet.tweet_photo
                    ? tweetPicsURL + authUserTweet.tweet_photo
                    : null
                }
                likesCount={authUserTweet.likes.length}
                authUserId={authUserTweet.id}
                tweepLikeId={authUserTweet.likes.map((l) => l.user_id)}
              ></AuthUserTweets>
            ))
          ) : (
            <div className="text-center text-black mt-5 mx-auto">
              <h2>No Tweets Found</h2>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default Profile;
