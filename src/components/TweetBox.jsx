import React, { useState, useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar, Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import GifOutlinedIcon from "@material-ui/icons/GifOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import HttpService from "../services/HttpServices";
import SuccessMsg from "../utils/snackBars/SuccessMsg";
import { RefreshTweetsAction } from "../redux/actions/TweetActions";
import { SendTweetService } from "../services/TweetServices";
import ErrorMsg from "../utils/snackBars/ErrorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      // width: "55ch",
    },
  },
}));

const TweetBox = (openTweetBox, closeTweetBox) => {
  const profilePicsUrl = "http://localhost:8000/profile/photos/";
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user.credentials);
  const allTweets = useSelector((state) => state.tweetReducer.allTweets);
  const [tBtn, settBtn] = useState(false);
  const classes = useStyles();

  // tweets
  const [tweetText, setTweetText] = useState("");

  const [tweetImageF, setTweetImage] = useState("");

  const [tweetErrors, setTweetErrors] = useState({
    tweetErrorMsg: {
      tweet_text: "",
      tweet_photo: "",
    },
  });

  const [tweetSuccess, setTweetSuccess] = useState(false);
  const [tweetErr, setTweetErr] = useState(false);

  useEffect(() => {
    console.log("================jifijrefierjfij====================");
    console.log(profilePicsUrl + user);
    console.log("====================================");
  }, []);

  const [tweetImageRemover, setTweetImageRemover] = useState(false);

  const handleTweetTextChange = (e) => {
    setTweetText(e.target.value);

    // clear error message
    clearErrs();
    settBtn(true);
  };

  const clearErrs = () => {
    setTweetErrors({
      ...tweetErrors,
      tweetErrorMsg: {},
    });
  };

  const clearTweetFields = () => {
    setTweetText("");
    setTweetImage("");
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
    console.log("====================================");
    console.log(tweetImageF);
    console.log("====================================");
  };

  const removeImg = () => {
    setTweetImage({
      ...tweetImageF,
      tweetImageF: "",
    });
    setTweetImageRemover(false);
  };

  const sendTweet = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        tweet_text: tweetText,
        tweet_photo: tweetImageF,
      };
      const res = await SendTweetService(payload);
      if (res.data.status == 400 && res.data.success === false) {
        setTweetErr(true);
        setTweetErrors({
          ...tweetErrors,
          tweet_text: res.data.message.tweet_text,
          tweet_photo: res.data.message.tweet_photo,
        });
        console.log(tweetErrors.tweet_text[0]);
      } else if (res.data.status == 200 && res.data.success === true) {
        console.log(res.data);
        clearTweetFields();
        setTweetSuccess(true);
        dispatch(RefreshTweetsAction());
      }
    } catch (err) {
      setTweetErr(true);
      console.error(err);
    }
  };

  const visitProf = () => {
    history.push("/profile");
  };

  const closeTS = () => {
    setTweetSuccess(false);
  };

  const closeTE = () => {
    setTweetErr(false);
  };

  return (
    <>
      <ErrorMsg
        errMsg={
          tweetErrors.tweet_text
            ? tweetErrors.tweet_text[0]
            : "Oops! Something went wrong."
        }
        // errMsg={"Oops! Something went wrong."}
        closeSnackBar={closeTE}
        visible={tweetErr}
      />
      <SuccessMsg
        sucMsg={"tweet sent"}
        tweetErr={tweetErr}
        closeSnackBar={closeTS}
        visible={tweetSuccess}
      />
      <div className="tweetBox">
        <form
          noValidate
          autoComplete="off"
          onSubmit={sendTweet}
          className={classes.root}
        >
          <div className="tweetBox__input">
            <Avatar
              src={profilePicsUrl + user.profile_picture}
              // sx={{ width: 45, height: 45 }}
              className="shadow-sm mr-5 cursor-pointer"
              onClick={visitProf}
            />
            <TextField
              id="tweet_text"
              value={tweetText}
              helpertext={tweetErrors.tweet_text && tweetErrors.tweet_text[0]}
              error={tweetErrors.tweet_text && true}
              multiline
              maxRows={5}
              fullWidth
              placeholder="What's happening?"
              onChange={handleTweetTextChange}
            />
          </div>
          {tweetImageF && (
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
          )}
          <input
            helpertext={tweetErrors.tweetErrorMsg.tweet_photo}
            error={tweetErrors.tweetErrorMsg.tweet_photo && true}
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
              <Button
                type="submit"
                className="tweetBox__tweetButton "
                disabled={tBtn === false}
              >
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
