import React, { useState, useContext, useEffect } from "react";

// services
import HttpService from "../../services/HttpServices";
import { IndexContext } from "../../contexts/IndexContext";
import { AuthContext } from "../../contexts/AuthContext";
import { initState } from "../../contexts/IndexContext";
// import { GetAuthUserData } from "../../contexts/actions/AuthActions";

// mui icons
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
// import { SuccessSnackBar } from "../utils/SnackBars";

// mui
import { Avatar, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// libs
import FlipMove from "react-flip-move";

const TweetBox = () => {
  const { authUser } = useContext(AuthContext);
  // const { state = initState, dispatch } = useContext(IndexContext);

  useEffect(() => {
    console.log("====================================");
    console.log(authUser.profile_picture);
    console.log("====================================");
  }, [authUser]);

  const http = new HttpService();

  const profilePicsUrl = "http://localhost:8000/profile/photos/";

  // tweets
  const [tweetText, setTweet] = useState("");

  const [tweetImageF, setTweetImage] = useState("");

  const [tweetImageRemover, setTweetImageRemover] = useState(false);

  const [openTweetSuccessMessage, setOpenTweetSuccessMessage] = useState(false);

  // auth user
  // const [authUser, setAuthUser] = useState({
  //   authUserDetails: {},
  // });

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

    // const formData = new FormData();
    // formData.append("file", file);
    // setTweetImage({
    //   ...file,
    //   [e.target.id]: e.target.files[0],
    // });
  };

  const removeImg = () => {
    setTweetImage({
      ...tweetImageF,
      tweetImageF: "",
    });
    setTweetImageRemover(false);
  };

  const sendTweet = (e) => {
    e.preventDefault();

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
    history.push(`/${handle}`);
  };

  const closeTweetSuccessMessage = () => {
    setOpenTweetSuccessMessage(false);
  };

  // tweet box ends

  const fetchTweetsFromServer = () => {
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
      <div className="tweetBox">
        <form
          noValidate
          autoComplete="off"
          // onSubmit={sendTweet}
        >
          <div className="tweetBox__input">
            <Avatar
              src={profilePicsUrl + authUser.profile_picture}
              className="shadow-sm mr-5 cursor-pointer"
              // onClick={navigate()}
            />
            <TextField
              id="tweet_text"
              value={tweetText}
              helperText={tweetErrors.tweetErrorMsg.tweet_text}
              error={tweetErrors.tweetErrorMsg.tweet_text ? true : false}
              multiline
              maxRows={5}
              className="border-none"
              sx={{ ml: 3, mt: 1 }}
              fullWidth
              placeholder="What's happening?"
              onChange={handleChange}
              variant="standard"
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
            helperText={tweetErrors.tweetErrorMsg.tweet_photo}
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
    </>
  );
};

export default TweetBox;
