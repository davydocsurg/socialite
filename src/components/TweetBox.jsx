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
import FlareOutlinedIcon from "@material-ui/icons/FlareOutlined";
import HttpService from "../services/HttpServices";
import axios from "axios";
import { CloseTweetBox } from "../redux/actions/TweetActions";
import { PropTypes } from "prop-types";
import { FetchTweetsAction } from "../redux/actions/TweetActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "55ch",
    },
  },
}));

const TweetBox = (openTweetBox, closeTweetBox) => {
  const [tweets, setTweets] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [tweetBoxVisibility, setTweetBoxVisibility] = useState(true);

  const user = useSelector((state) => state.user.credentials);
  const allTweets = useSelector((state) => state.tweetReducer.allTweets);

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

  const [tweetImageRemover, setTweetImageRemover] = useState(false);

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
    fetchAuthUser();
    fetchTweetsFromServer();
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
          authUserDetails: res.data.credentials,
        });
        // console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCloseTweetBox = () => {
    setTweetBoxVisibility(false);
    dispatch(CloseTweetBox());
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
    history.push("/profile");
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
    <>
      {openTweetBox && (
        <Modal open={openTweetBox}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tweet</h5>
                <button
                  className="close btn btn-twitter"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseTweetBox}
                >
                  <span className="font-weight-light" aria-hidden="true">
                    &times;
                  </span>
                </button>
              </div>
              <div className="modal-body">
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
                        className="shadow-sm mr-5 cursor-pointer"
                        onClick={goToProfile}
                      />
                      <TextField
                        id="tweet_text"
                        value={tweetText}
                        helperText={tweetErrors.tweetErrorMsg.tweet_text}
                        error={
                          tweetErrors.tweetErrorMsg.tweet_text ? true : false
                        }
                        multiline
                        maxRows={5}
                        className="ml-3 border-none"
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
                      helperText={tweetErrors.tweetErrorMsg.tweet_photo}
                      error={
                        tweetErrors.tweetErrorMsg.tweet_photo ? true : false
                      }
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
                        >
                          Tweet
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

// TweetBox.propTypes = {
//   user: PropTypes.object.isRequired,
//   tweetReducer: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     tweetReducer: state.tweetReducer,
//   };
// };

// export default connect(mapStateToProps)(TweetBox);
export default TweetBox;
