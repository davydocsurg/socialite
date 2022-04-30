import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import Tweet from "./tweets/Tweet";
import FlipMove from "react-flip-move";
import { Avatar, Button, TextField } from "@material-ui/core";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import GifOutlinedIcon from "@material-ui/icons/GifOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import FlareOutlinedIcon from "@material-ui/icons/FlareOutlined";
import AssistantOutlinedIcon from "@material-ui/icons/AssistantOutlined";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import HttpService from "../services/HttpServices";
import { Link, useHistory } from "react-router-dom";
// redux
import {
  CreateTweetAction,
  FetchTweetsAction,
  FetchTweetsLikeAction,
} from "../redux/actions/TweetActions";
import { useDispatch, connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getUserData } from "../redux/actions/AuthActions";
import { GetAuthUserService } from "../redux/actions/UserService";
// import { LoadProfile } from "../services/ProfileServices";
import * as ActionTypes from "../redux/ActionTypes";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      // width: "55ch",
    },
  },
}));

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("==============llllll======================");
    console.log();
    console.log("====================================");
    // dispatch(getUserData());
    fetchAuthUser();
    dispatch(FetchTweetsAction());

    // return () => {
    //   fetchAuthUser();
    // };
  }, []);

  // useEffect(() => {
  //   // fetchAuthUser()
  //   console.log("====================================");
  //   console.log("check auth cont....");
  //   console.log("====================================");
  // }, [user.authenticated]);

  const user = useSelector((state) => state.user);
  const allTweets = useSelector((state) => state.tweetReducer.allTweets);
  const UI = useSelector((state) => state.UI);

  // tweet box begins
  const classes = useStyles();

  const profilePicsUrl = "http://localhost:8000/profile/photos/";
  const tweetPhotoUrl = "http://localhost:8000/tweets/photos/";

  // auth user
  const [authUser, setAuthUser] = useState({
    authUserDetails: {},
  });

  const fetchAuthUser = async () => {
    console.log("..........");
    try {
      const res = await GetAuthUserService();
      if (res.data.status == 400 && res.data.success === false) {
        console.log(res.data);
      } else if (res.data.status == 200 && res.data.success === true) {
        console.log(res.data);
        dispatch({
          type: ActionTypes.SET_USER,
          payload: res.data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="feed mt-0 containe text-left">
        {/* <HomeRoutes></HomeRoutes> */}
        <div className="feed__header row overflow-hidden">
          <div className="col-11">
            <h2 className="mr-auto">Home</h2>
          </div>
          <div className="col-1 ml-auto text-right">
            <FlareOutlinedIcon className="active text-right float-right ">
              {" "}
            </FlareOutlinedIcon>
          </div>
        </div>
        {user.authenticated === true ? (
          <TweetBox />
        ) : (
          <div className="container">
            <div className="card shadow-none my-3">
              <div className="card-body">
                <Link to="/signin">
                  <h4 className="text-center">Login to tweet</h4>
                </Link>
              </div>
            </div>
          </div>
        )}
        {/* loading UI */}
        {UI.loading && (
          <div className="mb-auto mt-5 text-center mx-auto text-twitter-color">
            <i className="spinner-border spinner-border-md "></i>
          </div>
        )}

        {allTweets.length > 0 && UI.loading === false ? (
          <FlipMove>
            {allTweets.map((tweet) => (
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
                  tweet.tweet_photo ? tweetPhotoUrl + tweet.tweet_photo : null
                }
                likesCount={tweet.likes.length}
                tweepLikeId={tweet.likes.map((l) => l.user_id)}
                authUserId={user.id}
              ></Tweet>
            ))}
          </FlipMove>
        ) : (
          allTweets.length < 1 &&
          UI.loading === false && (
            <div className="text-center mt-5">
              <h2>No Tweets Found</h2>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Feed;
