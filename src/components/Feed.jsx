import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import Tweet from "./Tweet";
import FlipMove from "react-flip-move";
import { Avatar, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import HttpService from "../services/HttpServices";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "55ch",
    },
  },
}));

function Feed() {
  const [tweets, setTweets] = useState([]);
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
    Authorization: `Bearer ${token}`,
  };

  // tweets
  const [tweetText, setTweet] = useState("");
  // const [tweet, setTweet] = useState({
  //   tweet_text: "",
  //   tweet_photo: "",
  // });

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
    // setTweet({
    //   ...tweet,
    //   [e.target.id]: e.target.value || e.target.files[0],
    // });
    setTweet(e.target.value);

    // clear error message
    setTweetErrors({
      ...tweetErrors,
      tweetErrorMsg: {},
    });
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

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

    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // };

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

          fetchTweetsFromServer();
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        setTweetErrors({
          ...tweetErrors,
          tweetErrorMsg: err.response.data,
        });
      });
  };

  // tweet box ends

  const fetchTweetsFromServer = () => {
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

    // axios
    //   .get("http:localhost:8000/api/tweets")
    //   .then((res) => {
    //     setTweets(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
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
                // label="Multiline"
                helperText={tweetErrors.tweetErrorMsg.tweet_text}
                error={tweetErrors.tweetErrorMsg.tweet_text ? true : false}
                multiline
                maxRows={5}
                className="ml-3 border-none"
                placeholder="What's happening?"
                // onChange={(e) => setTweet(e.target.value)}
                onChange={handleChange}
              />
            </div>
            <input
              // value={tweetImageF}
              // value=""
              helperText={tweetErrors.tweetErrorMsg.tweet_photo}
              error={tweetErrors.tweetErrorMsg.tweet_photo ? true : false}
              id="tweet_photo"
              onChange={handleFileChange}
              // onChange={(e) => handleFileChange(e)}
              className="tweetBox__imageInput"
              placeholder="Optional: Enter image URL"
              type="file"
            />

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
}

export default Feed;
