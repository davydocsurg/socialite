import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import HttpService from "../services/HttpServices";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "55ch",
    },
  },
}));

function TweetBox() {
  const classes = useStyles();
  const http = new HttpService();

  // authorization
  const token = localStorage.getItem("user-token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // tweets
  // const [tweet, setTweet] = useState({
  //   tweet_text: "",
  //   tweet_photo: "",
  // });

  const [tweet, setTweet] = useState({
    tweet_text: "",
  });

  const [files, setFiles] = useState("");

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
    setTweet({
      ...tweet,
      [e.target.id]: e.target.value,
    });

    // clear error message
    setTweetErrors({
      ...tweetErrors,
      tweetErrorMsg: {},
    });
  };

  const uploadFile = (e) => {
    setFiles({ ...files, [e.target.id]: e.target.files[0] });
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  const fetchAuthUser = () => {
    let authUserUrl = "authUser";

    axios
      .get("http://localhost:8000/api/authUser", {
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

    // return http
    //   .getData(authUserUrl)
    //   .then((res) => {
    //     setAuthUser(res);
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const sendTweet = (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("http://localhost:8000/api/tweet/create", tweet, {
        headers: headers,
      })
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
          setTweet({
            ...tweet,
            tweet_text: "",
            tweet_photo: "",
          });
          // setOpen(false);
          // setShowSuccess(true);
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

  return (
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
            value={tweet.tweet_text}
            // label="Multiline"
            helperText={tweetErrors.tweetErrorMsg.tweet_text}
            error={tweetErrors.tweetErrorMsg.tweet_text ? true : false}
            multiline
            maxRows={5}
            className="ml-3"
            placeholder="What's happening?"
            onChange={handleChange}
          />
        </div>
        <input
          value={tweet.tweet_photo}
          helperText={tweetErrors.tweetErrorMsg.tweet_photo}
          error={tweetErrors.tweetErrorMsg.tweet_photo ? true : false}
          id="tweet_photo"
          onChange={uploadFile}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="file"
        />

        <Button type="submit" className="tweetBox__tweetButton">
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
