import React, { useState, useEffect } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import {
  Avatar,
  Button,
  Modal,
  TextField,
  Icon,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import GifOutlinedIcon from "@material-ui/icons/GifOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import axios from "axios";
import HttpService from "../services/HttpServices";
import { getUserData, SignOutAction } from "../redux/actions/AuthActions";
import { useDispatch, connect, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import TweetBox from "./TweetBox";
import {
  OpenTweetBox,
  CloseTweetBox,
  FetchTweetsAction,
} from "../redux/actions/TweetActions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Bookmarks,
  Explore,
  Home,
  Lists,
  Messages,
  More,
  Notifications,
  Profile,
} from "../utils/baseIcons/sideBarIcons";
import { SignOutService } from "../services/AuthServices";
import { Endpoints } from "../api/axios";

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

const Sidebar = () => {
  let token = localStorage.getItem("user-token");
  let { path, url } = useRouteMatch();
  const http = new HttpService();
  const history = useHistory();
  const dispatch = useDispatch();
  const [tweetBoxVisibility, setTweetBoxVisibility] = useState(false);
  const classes = useStyles();
  const [openTweetSuccessMessage, setOpenTweetSuccessMessage] = useState(false);

  const user = useSelector((state) => state.user.credentials);
  const authenticated = useSelector((state) => state.user.authenticated);
  const [openErr, setOpenErr] = useState({
    openErr: false,
  });

  const [spinner, setSpinner] = useState(false);

  const [showSuccess, setShowSuccess] = useState({
    showSuccess: false,
  });

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

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  const closeErr = () => {
    setOpenErr(false);
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
    history.push("/profile");
  };

  // tweet box ends

  const goHome = () => {
    location.href = "/home";
  };

  const signOut = async (e) => {
    e.preventDefault();

    setSpinner(true);
    // dispatch(SignOutAction(history));

    try {
      const res = await SignOutService();
      if (res.data.status == 400 && res.data.success === false) {
        setOpen(true);
      } else if (res.data.status == 200 && res.data.success === true) {
        setSpinner(false);
        setShowSuccess(true);
        // setTimeout(() => {
        // }, 1800);
        history.push(Endpoints.signIn);
      }
    } catch (err) {
      console.error(err);
      setSpinner(true);
    }
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

      <Snackbar
        open={showSuccess || !authenticated}
        autoHideDuration={6000}
        onClose={closeSuccess}
      >
        <Alert onClose={closeSuccess} severity="success">
          Signed Out!
        </Alert>
      </Snackbar>

      <Snackbar open={openErr} autoHideDuration={6000} onClose={closeErr}>
        <Alert onClose={closeErr} severity="error">
          Oops! something went wrong. Try again.
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
                          src={profilePicsUrl + user.profile_picture}
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
          <SidebarOption Icon={Home} text="Home" />
        </Link>

        <Link
          className={`side_text ${
            location.pathname.match("/explore") && "active"
          }`}
          to={`/explore`}
        >
          <SidebarOption Icon={Explore} text="Explore" />
        </Link>
        {authenticated !== null && authenticated !== "" ? (
          <div className="">
            <Link
              className={`side_text ${
                location.pathname.match("/notifications") && "active"
              }`}
              to={`/notifications`}
            >
              <SidebarOption Icon={Notifications} text="Notifications" />
            </Link>
            <SidebarOption Icon={Messages} text="Messages" />
            <SidebarOption Icon={Bookmarks} text="Bookmarks" />
            <SidebarOption Icon={Lists} text="Lists" />
            {/* <Link
            className={`side_text ${
              location.pathname.match(`/${handle}`) && "active"
            }`}
            to={`/${handle}`}
          > */}
            <Link
              className={`side_text ${
                location.pathname.match(`/${user.handle}`) && "active"
              }`}
              to={`/${user.handle}`}
            >
              <SidebarOption Icon={Profile} text="Profile" />
            </Link>
            <SidebarOption Icon={More} text="More" />
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
              startIcon={
                spinner ? (
                  <CircularProgress sx={{ pl: 3 }} color="inherit" size={20} />
                ) : (
                  <ExitToAppOutlinedIcon />
                )
              }
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
              {spinner ? (
                <CircularProgress sx={{ pl: 3 }} color="inherit" size={20} />
              ) : (
                <ExitToAppOutlinedIcon />
              )}
            </Button>
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
