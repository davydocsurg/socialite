import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import Tweet from "./Tweet";
import FlipMove from "react-flip-move";
import { Avatar, Button, TextField } from "@material-ui/core";
// import { EditIcon } from "@material-ui/core/IconButton";
// import { IconButton } from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import HttpService from "../services/HttpServices";
import { Link } from "react-router-dom";
// redux
import {
  CreateTweetAction,
  FetchTweetsAction,
} from "../redux/actions/TweetActions";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "55ch",
    },
  },
}));

const Feed = ({ UI, tweetReducer }) => {
  const [tweets, setTweets] = useState([]);
  const dispatch = useDispatch();
  //   const [tweetsData, setTweetsData] = useState({
  //     tweets: {
  //       tweet_text: "",
  //       tweet_photo: "",
  // created_at:'',
  //       tweep:{
  //         first_name:'',
  //         last_name:'',
  //         handle:'',
  //       }
  //     },
  //   });

  // tweet box begins
  const classes = useStyles();
  const http = new HttpService();

  // authorization
  const token = localStorage.getItem("user-token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  // tweets
  const [tweetText, setTweet] = useState("");

  const [tweetImageF, setTweetImage] = useState("");

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

    // const formData = new FormData();
    // formData.append("file", file);
    // setTweetImage({
    //   ...file,
    //   [e.target.id]: e.target.files[0],
    // });
  };

  useEffect(() => {
    fetchAuthUser();
    fetchTweetsFromServer();

    return () => {
      fetchTweetsFromServer();
    };
  }, []);

  const fetchAuthUser = () => {
    let authUserUrl = "authUser";

    axios
      .get("http://localhost:8000/api/authUser", authUser, {
        headers: headers,
      })
      .then((res) => {
        setAuthUser({
          ...authUser,
          authUserDetails: res.data,
        });
        // console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
          // setTweetImage("");
          setTweet("");
          // document.getElementsByTagName("input").createAttribute("value");
          // document.getElementsByTagName("input").setAttribute("value", "");
          // var inpt = document.getElementsByTagName("input");

          // // .createAttribute("value");
          // var att = document.createAttribute("value");
          // att.value = "";
          // inpt.setAttribute("");

          fetchTweetsFromServer();
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

  // tweet box ends

  const fetchTweetsFromServer = () => {
    // dispatch(FetchTweetsAction());

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
    <div className="feed mt-0 containe text-left">
      {/* <HomeRoutes></HomeRoutes> */}
      <div className="feed__header">
        <h2>Home</h2>
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
                src={
                  "http://localhost:8000/storage/users/profile/" +
                  authUser.authUserDetails.profile_picture
                }
                className="shadow-sm mr-5"
              />
              <TextField
                id="tweet_text"
                value={tweetText}
                helperText={tweetErrors.tweetErrorMsg.tweet_text}
                error={tweetErrors.tweetErrorMsg.tweet_text ? true : false}
                multiline
                maxRows={5}
                className="ml-3 border-none"
                placeholder="What's happening?"
                onChange={handleChange}
              />
            </div>
            <input
              // {...(tweetImageF ? (value = "") : null)}
              // value=""
              helperText={tweetErrors.tweetErrorMsg.tweet_photo}
              error={tweetErrors.tweetErrorMsg.tweet_photo ? true : false}
              id="tweet_photo"
              onChange={handleFileChange}
              className="tweetBox__imageInput d-none"
              placeholder="Optional: Enter image URL"
              type="file"
            />

            {/* <IconButton onClick={handleFileInput} className="button">
              <EditIcon color="primary"></EditIcon>
            </IconButton> */}
            {tweetErrors.tweetErrorMsg.tweet_photo ? (
              <span className="text-danger">
                {tweetErrors.tweetErrorMsg.tweet_photo}
              </span>
            ) : null}

            <Button type="submit" className="tweetBox__tweetButton">
              Tweet
            </Button>
          </form>
        </div>
      ) : (
        <div className="container">
          <div className="card mt-3">
            <div className="card-body">
              <Link to="/signin">
                <h4 className="text-center">Login to tweet</h4>
              </Link>
            </div>
          </div>
        </div>
      )}
      <FlipMove>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.slug}
            tweepName={tweet.tweep.first_name + " " + tweet.tweep.last_name}
            username={tweet.tweep.handle}
            verified={true}
            text={tweet.tweet_text}
            tweetTime={tweet.created_at}
            avatar={
              "http://localhost:8000/storage/users/profile/" +
              tweet.tweep.profile_picture
            }
            tweetImage={
              tweet.tweet_photo
                ? "http://localhost:8000/tweets/photos/" + tweet.tweet_photo
                : null
            }
          ></Tweet>
        ))}
      </FlipMove>
    </div>
  );
};

Feed.prototypes = {
  CreateTweetAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  tweetReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
    tweetReducer: state.tweetReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch1: () => {
      dispatch(CreateTweetAction);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
