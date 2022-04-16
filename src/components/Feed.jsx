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
  const [tweets, setTweets] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user.credentials);
  const allTweets = useSelector((state) => state.tweetReducer.allTweets);
  const UI = useSelector((state) => state.UI);

  // tweet box begins
  const classes = useStyles();
  const http = new HttpService();

  // authorization
  const token = localStorage.getItem("user-token");

  const profilePicsUrl = "http://localhost:8000/profile/photos/";
  const tweetPhotoUrl = "http://localhost:8000/tweets/photos/";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  // tweets
  const [tweetText, setTweet] = useState("");

  const [tweetImageF, setTweetImage] = useState("");

  const [tweetImageRemover, setTweetImageRemover] = useState(false);

  const [openTweetSuccessMessage, setOpenTweetSuccessMessage] = useState(false);

  // auth user
  const [authUser, setAuthUser] = useState({
    authUserDetails: {},
  });

  const [tweetErrors, setTweetErrors] = useState({
    tweetErrorMsg: {
      tweet_text: "",
      tweet_photo: "",
    },
  });

  const handleChange = (e) => {
    setTweet(e.target.value);

    // clear error message
    setTweetErrors({
      ...tweetErrors,
      tweetErrorMsg: {},
    });
  };

  const handleFileInput = () => {
    const fileInp = document.getElementById("tweet_photo");
    fileInp.click();
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    let limit = 1024 * 1024 * 2;
    if (file["size"] > limit) {
      setTweetImage({
        ...tweetImageF,
        tweetImageF: "",
      });
      alert("File is too large! It must be less than 2MB.");

      return false;
    }

    reader.onloadend = (file) => {
      setTweetImage(reader.result);
    };
    reader.readAsDataURL(file);

    setTweetImageRemover(true);
  };

  const removeImg = () => {
    setTweetImage({
      ...tweetImageF,
      tweetImageF: "",
    });
    setTweetImageRemover(false);
  };

  useEffect(() => {
    dispatch(getUserData());
    dispatch(FetchTweetsAction());

    return () => {};
  }, []);

  const sendTweet = (e) => {
    e.preventDefault();

    // dispatch(CreateTweetAction(tweetText, tweetImageF));

    // if ((tweetReducer.tweets = [])) {
    //   setTweet("");
    //   setTweetImage("");
    // } else if (tweetReducer.tweets !== []) {
    //   fetchTweetsFromServer();
    // }

    // if (UI.errors) {
    //   setTweetErrors({
    //     ...tweetErrors,
    //     tweetErrorMsg: {
    //       tweet_text: UI.errors.tweet_text,
    //       tweet_photo: UI.errors.tweet_photo,
    //     },
    //   });

    //   // document.getElementById("tweet_photo").value("");
    //   console.log("====================================");
    //   console.log(tweetErrors);
    //   console.log("====================================");
    // } else {
    //   // clear error message
    //   setTweetErrors({
    //     ...tweetErrors,
    //     tweetErrorMsg: {},
    //   });
    // }

    axios
      .post(
        "http://localhost:8000/api/tweet/create",
        { tweet_text: tweetText, tweet_photo: tweetImageF },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setTweetErrors({
            ...tweetErrors,
            tweetErrorMsg: res.data.message,
          });
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          setTweetImage("");
          setTweet("");

          setTweetImageRemover(false);
          setOpenTweetSuccessMessage(true);
          dispatch(FetchTweetsAction());
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        setTweetErrors({
          ...tweetErrors,
          tweetErrorMsg: err,
        });
      });
  };

  const goToProfile = () => {
    history.push(`/${user.handle}`);
  };

  const closeTweetSuccessMessage = () => {
    setOpenTweetSuccessMessage(false);
  };

  // tweet box ends

  const fetchTweetsFromServer = () => {
    dispatch(FetchTweetsAction());

    // if (tweetReducer.tweets !== []) {
    //   setTweets(tweetReducer.tweets);
    // }

    const http = new HttpService();
    let tweetsUrl = "tweets";

    return http
      .getData(tweetsUrl)
      .then((res) => {
        setTweets(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {/* tweet success message */}
      <Snackbar
        open={openTweetSuccessMessage}
        autoHideDuration={6000}
        onClose={closeTweetSuccessMessage}
      >
        <Alert onClose={closeTweetSuccessMessage} severity="success">
          Tweet sent!
        </Alert>
      </Snackbar>
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
        {token !== null && token !== "" ? (
          // <TweetBox></TweetBox>
          <div className="tweetBox">
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={sendTweet}
            >
              <div className="tweetBox__input">
                <Avatar
                  src={profilePicsUrl + user.profile_picture}
                  className="shadow-sm mr-5 cursor-pointer"
                  onClick={goToProfile}
                />
                <TextField
                  id="tweet_text"
                  value={tweetText}
                  helpertext={tweetErrors.tweetErrorMsg.tweet_text}
                  error={tweetErrors.tweetErrorMsg.tweet_text ? true : false}
                  multiline
                  maxRows={5}
                  fullWidth
                  placeholder="What's happening?"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 col-10 mx-auto img-preview">
                {tweetImageRemover && (
                  <button
                    className="btn shadow-lg position-absolute btn-remove-img"
                    onClick={removeImg}
                    type="button"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
                <img
                  src={tweetImageF}
                  alt=""
                  className="py-2 shadow-sm img-fluid"
                />
              </div>
              <input
                helpertext={tweetErrors.tweetErrorMsg.tweet_photo}
                error={tweetErrors.tweetErrorMsg.tweet_photo ? true : false}
                id="tweet_photo"
                onChange={handleFileChange}
                className="tweetBox__imageInput d-none"
                placeholder="Optional: Enter image URL"
                type="file"
              />
              {tweetErrors.tweetErrorMsg.tweet_photo ? (
                <span className="text-danger">
                  {tweetErrors.tweetErrorMsg.tweet_photo}
                </span>
              ) : null}

              <div className="row">
                <div className="col-6 mr-auto">
                  <div className="emoji-row d-flex">
                    <PhotoOutlinedIcon
                      onClick={handleFileInput}
                      className="fileUpld  active cursor-pointer"
                    ></PhotoOutlinedIcon>

                    <GifOutlinedIcon className="fileUpld active cursor-pointer"></GifOutlinedIcon>
                    <PollOutlinedIcon className="fileUpld active cursor-pointer"></PollOutlinedIcon>
                    <EmojiEmotionsOutlinedIcon className="fileUpld active cursor-pointer"></EmojiEmotionsOutlinedIcon>
                    <ScheduleOutlinedIcon className="fileUpld active cursor-pointer"></ScheduleOutlinedIcon>
                  </div>
                </div>

                <div className="col-4"></div>

                <div className="col-2 ml-auto float-right">
                  <Button type="submit" className="tweetBox__tweetButton ">
                    Tweet
                  </Button>
                </div>
              </div>
            </form>
          </div>
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
