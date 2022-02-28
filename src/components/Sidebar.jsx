import React, { useState, useEffect } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Avatar, Button, Modal, TextField, Icon } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useMatch, useNavigate, useLocation } from "react-router-dom";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import axios from "axios";
import HttpService from "../services/HttpServices";
import { getUserData, SignOutAction } from "../redux/actions/AuthActions";
import { useDispatch, connect } from "react-redux";
import { PropTypes } from "prop-types";
import TweetBox from "./TweetBox";
import {
  OpenTweetBox,
  CloseTweetBox,
  FetchTweetsAction,
} from "../redux/actions/TweetActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "55ch",
    },
  },
}));

const Sidebar = ({
  tweetReducer,
  user: {
    credentials: {
      first_name,
      last_name,
      profile_picture,
      email,
      handle,
      is_verified,
      created_at,
      bio,
      website,
    },
  },
}) => {
  let token = localStorage.getItem("user-token");
  // let { path, url } = useMatch();
  const http = new HttpService();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tweetBoxVisibility, setTweetBoxVisibility] = useState(false);
  const classes = useStyles();
  const [openTweetSuccessMessage, setOpenTweetSuccessMessage] = useState(false);

  const [signOutDet, setSignOutDet] = useState("");
  const profilePicsUrl = "http://localhost:8000/profile/photos/";

  // authorization
  const headers = {
    "Content-Type": "application/json",
    Authorization: ` ${token}`,
  };

  const location = useLocation();

  const openTweetBox = () => {
    setTweetBoxVisibility(true);
    // dispatch(OpenTweetBox());
  };

  const closeTweetBox = () => {
    setTweetBoxVisibility(false);
    // dispatch(CloseTweetBox());
  };

  const signOut = (e) => {
    e.preventDefault();

    dispatch(SignOutAction(navigate));
  };

  // ************** tweet box **************
  const [tweets, setTweets] = useState([]);

  // tweet box begins

  // tweets
  const [tweetText, setTweet] = useState("");

  const [tweetImageF, setTweetImage] = useState("");

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
    // fetchAuthUser();
    // fetchTweetsFromServer();
  }, []);

  const closeTweetSuccessMessage = () => {
    setOpenTweetSuccessMessage(false);
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
          setOpenTweetSuccessMessage(true);
          dispatch(getUserData());
          dispatch(FetchTweetsAction());
          setTweetBoxVisibility(false);
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
    navigate("/profile");
  };

  // tweet box ends

  const goHome = () => {
    location.href = "/home";
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
      {/* {tweetBoxVisibility && ( */}
      {tweetBoxVisibility && (
        <>
          <Modal open={tweetBoxVisibility}>
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
                          src={profilePicsUrl + profile_picture}
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
          {/* <TweetBox
            openTweetBox={tweetReducer.tweetBoxVisibility}
            closeTweetBox={!tweetBoxVisibility}
          ></TweetBox> */}
        </>
      )}
      {/* <TweetBox></TweetBox> */}
      <div className="sidebar">
        <TwitterIcon
          className="sidebar__twitterIcon cursor-pointer"
          onClick={goHome}
        />

        <Link
          className={`side_text ${
            location.pathname.match("/home") && "active"
          }`}
          to="/home"
        >
          <SidebarOption Icon={HomeIcon} text="Home" />
        </Link>

        <Link
          className={`side_text ${
            location.pathname.match("/explore") && "active"
          }`}
          to={`/explore`}
        >
          <SidebarOption Icon={SearchIcon} text="Explore" />
        </Link>
        {token !== null && token !== "" ? (
          <div className="">
            <Link
              className={`side_text ${
                location.pathname.match("/notifications") && "active"
              }`}
              to={`/notifications`}
            >
              <SidebarOption
                Icon={NotificationsNoneIcon}
                text="Notifications"
              />
            </Link>
            <SidebarOption Icon={MailOutlineIcon} text="Messages" />
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
            <SidebarOption Icon={ListAltIcon} text="Lists" />
            {/* <Link
            className={`side_text ${
              location.pathname.match(`/${handle}`) && "active"
            }`}
            to={`/${handle}`}
          > */}
            <Link
              className={`side_text ${
                location.pathname.match(`/${handle}`) && "active"
              }`}
              to={`/${handle}`}
            >
              <SidebarOption Icon={PermIdentityIcon} text="Profile" />
            </Link>
            <SidebarOption Icon={MoreHorizIcon} text="More" />
            {/* Button -> Tweet */}
            <Button
              variant="outlined"
              className="sidebar__tweet d-none d-lg-block px-7"
              onClick={openTweetBox}
            >
              Tweet
            </Button>

            <Button
              variant="outlined"
              className="sidebar__tweet_icon d-lg-none"
              onClick={openTweetBox}
            >
              {/* <ExitToAppOutlinedIcon /> */}
              <Icon className="fas fa-feather-alt"></Icon>
            </Button>

            <Button
              variant="contained"
              startIcon={<ExitToAppOutlinedIcon />}
              className="sidebar__signout d-none d-lg-inline-block"
              // fullWidth
              onClick={signOut}
            >
              Sign Out
            </Button>

            <Button
              variant="contained"
              className="sidebar__signout-md d-lg-none "
              // fullWidth
              onClick={signOut}
            >
              <ExitToAppOutlinedIcon />
            </Button>
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  tweetReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    tweetReducer: state.tweetReducer,
  };
};

export default connect(mapStateToProps)(Sidebar);
