import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// mui
import { Avatar, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// libs
import FlipMove from "react-flip-move";
import axios from "axios";
import HttpService from "../services/HttpServices";

// mui icons
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import { SuccessSnackBar } from "../utils/SnackBars";

// components
import TweetBox from "./tweets/TweetBox";
import { IndexContext } from "../contexts/IndexContext";
import { Tweet } from "./tweets/Tweet";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Feed = () => {
  const {
    authState: { loading, authenticated, errors },
    tweetsState,
    // state = initState,
    // dispatch,
    openTweetSuccessMessage,
    closeTweetSM,
    // loading,
    // tweets,
  } = useContext(IndexContext);

  return (
    <div>
      {/* tweet success message */}
      <Snackbar
        open={openTweetSuccessMessage}
        autoHideDuration={6000}
        onClose={closeTweetSM}
      >
        <Alert onClose={closeTweetSM} severity="success">
          Tweet sent!
        </Alert>
      </Snackbar>

      {/* <SuccessSnackBar
        openTweetSuccessMessage={handleOpenTM}
        handleCloseTM={handleCloseTM}
      /> */}

      <TweetBox></TweetBox>

      {loading && (
        <div className="mb-auto mt-5 text-center mx-auto text-twitter-color">
          <i className="spinner-border spinner-border-md "></i>
        </div>
      )}

      {tweetsState.tweets.length > 0 && loading == false ? (
        <FlipMove>
          {tweetsState.tweets.map((tweet) => (
            <Tweet
              key={tweet.slug}
              slug={tweet.slug}
              tweepName={tweet.tweep.first_name + " " + tweet.tweep.last_name}
              username={tweet.tweep.handle}
              verified={tweet.tweep.is_verified}
              text={tweet.tweet_text}
              tweetTime={tweet.created_at}
              avatar={profilePicsUrl + tweet.tweep.profile_picture}
              tweetImage={
                tweet.tweet_photo
                  ? "http://localhost:8000/tweets/photos/" + tweet.tweet_photo
                  : null
              }
              likesCount={tweet.likes.length}
              tweepLikeId={tweet.likes.map((l) => l.user_id)}
              authUserId={id}
            ></Tweet>
          ))}
        </FlipMove>
      ) : (
        (allTweets.length = 0 && UI.loading == false && (
          <div className="text-center mt-5">
            <h2>No Tweets Found</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
